/**
 * Illustrative corridor animation for the relay page.
 *
 * This is a deterministic picture of the idea — trucks running a corridor in
 * both directions, changing drivers at each relay point and carrying on. It is
 * not the production scheduler and it is not deployment data.
 */

export type Dir = 1 | -1;

type Driver = {
  key: string;
  /** Station index this driver goes back to at the end of their shift. */
  home: number;
  /** Direction of the next leg when standing at their own base. */
  outDir: Dir;
};

type Truck = {
  id: string;
  dir: Dir;
  /** Continuous position in station-index space: 0 at Kanpur, 4 at Delhi. */
  pos: number;
  target: number;
  state: "run" | "swap";
  timer: number;
  pulse: number;
  driver: Driver;
};

export type World = {
  t: number;
  trucks: Truck[];
  pools: Driver[][];
  handoffs: number;
  driversHome: number;
  nextKey: number;
};

export const STATIONS = [
  { name: "Kanpur", code: "KNP", km: 0, role: "depot" },
  { name: "Etawah", code: "ETW", km: 110, role: "relay" },
  { name: "Agra", code: "AGR", km: 220, role: "relay" },
  { name: "Mathura", code: "MTR", km: 330, role: "relay" },
  { name: "Delhi", code: "DEL", km: 440, role: "depot" },
] as const;

export const LAST = STATIONS.length - 1;

/** Animation seconds a truck takes to cover one relay leg. */
const LEG_SECONDS = 6.5;
/** The beat a truck spends at a relay point: one driver off, one driver on. */
const SWAP_SECONDS = 0.9;
const PULSE_SECONDS = 0.9;
const MAX_SUB_STEP = 0.06;

const TRUCK_IDS = [
  "AGR-102",
  "AGR-114",
  "AGR-127",
  "AGR-133",
  "AGR-148",
  "AGR-155",
];

/** Six trucks spaced evenly around one round trip, so arrivals stay staggered. */
const TRUCK_SEED: { pos: number; dir: Dir; target: number; home: number }[] = [
  { pos: 0, dir: 1, target: 1, home: 0 },
  { pos: 4 / 3, dir: 1, target: 2, home: 2 },
  { pos: 8 / 3, dir: 1, target: 3, home: 2 },
  { pos: 4, dir: -1, target: 3, home: 4 },
  { pos: 8 / 3, dir: -1, target: 2, home: 2 },
  { pos: 4 / 3, dir: -1, target: 1, home: 1 },
];

const DEPOT_SEED = 4;
const RELAY_SEED = 3;

function makeDriver(world: World, home: number, outDir: Dir): Driver {
  world.nextKey += 1;
  return { key: `d${world.nextKey}`, home, outDir };
}

/** Which side a waiting driver stands on: the one that carries them home. */
function platformOf(driver: Driver, station: number): Dir {
  if (driver.home === station) {
    return driver.outDir;
  }
  return driver.home > station ? 1 : -1;
}

function readyOn(world: World, station: number, dir: Dir): number {
  let count = 0;
  for (const driver of world.pools[station]) {
    if (platformOf(driver, station) === dir) {
      count += 1;
    }
  }
  return count;
}

function pickOutDir(world: World, station: number): Dir {
  if (station === 0) {
    return 1;
  }
  if (station === LAST) {
    return -1;
  }
  return readyOn(world, station, 1) <= readyOn(world, station, -1) ? 1 : -1;
}

export function createWorld(): World {
  const world: World = {
    t: 0,
    trucks: [],
    pools: STATIONS.map(() => []),
    handoffs: 0,
    driversHome: 0,
    nextKey: 0,
  };

  for (let station = 0; station <= LAST; station += 1) {
    if (station === 0 || station === LAST) {
      const dir: Dir = station === 0 ? 1 : -1;
      for (let i = 0; i < DEPOT_SEED; i += 1) {
        world.pools[station].push(makeDriver(world, station, dir));
      }
    } else {
      for (let i = 0; i < RELAY_SEED; i += 1) {
        world.pools[station].push(makeDriver(world, station, 1));
        world.pools[station].push(makeDriver(world, station, -1));
      }
    }
  }

  world.trucks = TRUCK_SEED.map((seed, index) => ({
    id: TRUCK_IDS[index],
    dir: seed.dir,
    pos: seed.pos,
    target: seed.target,
    state: "run" as const,
    timer: 0,
    pulse: 0,
    driver: makeDriver(world, seed.home, seed.dir),
  }));

  return world;
}

function handoff(world: World, arrivals: { truck: Truck; station: number }[]) {
  // The arriving driver always steps off before the next one steps on, so the
  // count attached to a relay point never moves and can never go negative.
  for (const { truck, station } of arrivals) {
    const driver = truck.driver;
    if (driver.home === station) {
      world.driversHome += 1;
      driver.outDir = pickOutDir(world, station);
    }
    world.pools[station].push(driver);
  }

  for (const { truck, station } of arrivals) {
    const pool = world.pools[station];
    if (pool.length === 0) {
      continue;
    }
    let index = pool.findIndex(
      (driver) => platformOf(driver, station) === truck.dir,
    );
    if (index === -1) {
      index = 0;
    }
    const [next] = pool.splice(index, 1);
    truck.driver = next;
    world.handoffs += 1;
  }
}

function subStep(world: World, dt: number) {
  world.t += dt;
  const arrivals: { truck: Truck; station: number }[] = [];

  for (const truck of world.trucks) {
    if (truck.pulse > 0) {
      truck.pulse = Math.max(0, truck.pulse - dt);
    }

    if (truck.state === "swap") {
      truck.timer -= dt;
      if (truck.timer <= 0) {
        truck.state = "run";
        truck.timer = 0;
        truck.target = truck.pos + truck.dir;
      }
      continue;
    }

    truck.pos += (truck.dir * dt) / LEG_SECONDS;
    const reached =
      truck.dir === 1 ? truck.pos >= truck.target : truck.pos <= truck.target;
    if (!reached) {
      continue;
    }

    truck.pos = truck.target;
    truck.state = "swap";
    truck.timer = SWAP_SECONDS;
    truck.pulse = PULSE_SECONDS;
    if (truck.target === 0) {
      truck.dir = 1;
    } else if (truck.target === LAST) {
      truck.dir = -1;
    }
    arrivals.push({ truck, station: truck.target });
  }

  if (arrivals.length > 0) {
    handoff(world, arrivals);
  }
}

/** Advance the animation by `seconds`. */
export function advance(world: World, seconds: number) {
  let remaining = Math.max(0, seconds);
  while (remaining > 0) {
    const dt = Math.min(remaining, MAX_SUB_STEP);
    subStep(world, dt);
    remaining -= dt;
  }
}

export type Snapshot = {
  trucks: {
    id: string;
    pos: number;
    dir: Dir;
    pulse: number;
    swapping: boolean;
  }[];
  pools: { up: number; down: number }[];
  handoffs: number;
  driversHome: number;
};

export function snapshotOf(world: World): Snapshot {
  return {
    trucks: world.trucks.map((truck) => ({
      id: truck.id,
      pos: truck.pos,
      dir: truck.dir,
      pulse: truck.pulse / PULSE_SECONDS,
      swapping: truck.state === "swap",
    })),
    pools: STATIONS.map((_, station) => ({
      up: readyOn(world, station, 1),
      down: readyOn(world, station, -1),
    })),
    handoffs: world.handoffs,
    driversHome: world.driversHome,
  };
}
