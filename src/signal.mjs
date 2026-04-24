/** @type {Effect|null} */
let currentEffect = null;

/**
 * A reactive signal that holds a value and notifies dependents when it changes.
 *
 * @template T
 *
 * @example
 * const count = new Signal(0);
 * count.value = 1;
 * console.log(count.value); // 1
 */
export class Signal {
  /** @type {T} */
  _value;

  /** @type {Set<Effect>} */
  _dependents;

  /**
   * Creates a new Signal instance.
   *
   * @param {T} init - Initial value of the signal.
   */
  constructor(init) {
    this._value = init;
    this._dependents = new Set();
  }

  /**
   * Converts a plain object into an object of Signals.
   *
   * Each property of the input object will be wrapped in a {@link Signal}.
   *
   * @template {Record<string, any>} Obj
   * @param {Obj} init - Source object with plain values.
   * @returns {{ [K in keyof Obj]: Signal<Obj[K]> }} Object with the same keys, but Signal-wrapped values.
   *
   * @example
   * const state = Signal.SubSignal({
   *   count: 0,
   *   name: "Alice"
   * });
   *
   * state.count.value = 5;
   * console.log(state.name.value); // "Alice"
   */
  static SubSignal(init) {
    /** @type {Partial<{ [K in keyof Obj]: Signal<Obj[K]> }>} */
    let obj = {};
    for (const key of Object.keys(init)) {
      const k = /** @type {keyof Obj} */ (key);
      obj[k] = new Signal(init[k]);
    }
    return /** @type {{ [K in keyof Obj]: Signal<Obj[K]> }} */ (obj);
  }

  /**
   * Extracts the raw values from an object of Signals.
   *
   * This is the inverse operation of {@link Signal.SubSignal}.
   *
   * @template {Record<string, Signal<any>>} T
   * @param {T} obj - Object containing Signal instances.
   * @returns {{ [K in keyof T]: import("./datatypes.mjs").Unsignal<T[K]> }} Object with unwrapped values.
   *
   * @example
   * const state = Signal.SubSignal({
   *   count: 10,
   *   name: "Bob"
   * });
   *
   * const plain = Signal.SubSignalValues(state);
   * console.log(plain); // { count: 10, name: "Bob" }
   */
  static SubSignalValues(obj) {
    /** @type {{ [K in keyof T]?: import("./datatypes.mjs").Unsignal<T[K]> }} */
    const result = {};

    for (const key of Object.keys(obj)) {
      const k = /** @type {keyof T} */ (key);
      if (obj[k]) {
        result[k] = obj[k].value;
      }
    }

    return /** @type {{ [K in keyof T]: import("./datatypes.mjs").Unsignal<T[K]> }} */ (result);
  }

  /**
   * Gets the current value of the signal.
   *
   * If accessed inside an active {@link Effect}, the effect will be registered
   * as a dependent of this signal.
   *
   * @returns {T}
   *
   * @example
   * const count = new Signal(0);
   *
   * new Effect(() => {
   *   console.log("count changed:", count.value);
   * }); // logs: "count changed: 0"
   *
   * count.value = 1; // logs: "count changed: 1"
   */
  get value() {
    if (currentEffect) {
      this._dependents.add(currentEffect);
    }
    return this._value;
  }

  /**
   * Updates the signal's value and notifies all dependents.
   *
   * @param {T} value - New value to set.
   */
  set value(value) {
    this._value = value;
    this.signalDependents();
  }

  /**
   * Notifies all dependent effects to re-run.
   */
  signalDependents() {
    this._dependents.forEach((dep) => dep.run());
  }
}

/**
 * A derived (computed) reactive value based on other signals.
 *
 * Automatically updates when its dependencies change.
 *
 * @template T
 *
 * @example
 * const count = new Signal(2);
 * const doubled = new Derived(() => count.value * 2);
 *
 * console.log(doubled.value); // 4
 * count.value = 3;
 * console.log(doubled.value); // 6
 */
export class Derived {
  /**
   * Cached computed value.
   *
   * @private
   * @type {T|undefined}
   */
  _value = undefined;

  /**
   * Internal effect used to track dependencies.
   *
   * @private
   * @type {Effect}
   */
  _effect;

  /**
   * Effects depending on this derived value.
   *
   * @private
   * @type {Set<Effect>}
   */
  _dependents;

  /**
   * Creates a derived value.
   *
   * @param {() => T} func - Function that computes the value.
   */
  constructor(func) {
    this._dependents = new Set();
    this._effect = new Effect(() => {
      this.value = func();
    });
  }

  /**
   * Notifies dependents that the value has changed.
   *
   * @private
   */
  signalDependents() {
    this._dependents.forEach((dep) => dep.run());
  }

  /**
   * Sets the computed value and triggers updates.
   *
   * @private
   * @param {T} val
   */
  set value(val) {
    this._value = val;
    this.signalDependents();
  }

  /**
   * Gets the computed value.
   *
   * @throws {Error} (Unreachable) If accessed before initialization.
   * @returns {T}
   */
  get value() {
    if (this._value === undefined) {
      throw new Error("Unreachable: uninitialized value");
    }
    return this._value;
  }
}

/**
 * Represents a reactive side-effect that re-runs when its dependencies change.
 *
 * @example
 * const count = new Signal(0);
 *
 * new Effect(() => {
 *   console.log("Effect runs:", count.value);
 *
 *   return () => {
 *     console.log("cleanup before next run");
 *   };
 * });
 *
 * count.value = 1;
 * // Effect runs:0
 * // cleanup before next run
 * // Effect runs:0
 */
export class Effect {
  /**
   * The effect function.
   *
   * @private
   * @type {() => Function | undefined | void}
   */
  _func;

  /**
   * Optional cleanup function returned by the effect.
   *
   * @private
   * @type {Function | undefined | void}
   */
  _cleanUp;

  /**
   * Creates a new effect.
   *
   * @param {() => Function | undefined | void} func - Effect function.
   * @param {boolean} [andRun=true] - Whether to run the effect immediately.
   *
   * @example
   * const count = new Signal(0);
   *
   * new Effect(() => {
   *   console.log("Effect runs:", count.value);
   *
   *   return () => {
   *     console.log("cleanup before next run");
   *   };
   * });
   *
   * count.value = 1;
   * // Effect runs:0
   * // cleanup before next run
   * // Effect runs:0
   */
  constructor(func, andRun = true) {
    this._func = func;
    this._cleanUp = undefined;

    if (andRun) {
      this.run();
    }
  }

  /**
   * Executes the effect and tracks dependencies.
   *
   * Runs cleanup (if provided) before re-execution.
   *
   * @throws {Error} If effects are nested (stacked).
   */
  run() {
    if (currentEffect) {
      throw new Error("You cannot stack effects");
    }
    currentEffect = this;

    if (this._cleanUp && typeof this._cleanUp === "function") {
      this._cleanUp();
    }

    this._cleanUp = this._func();
    currentEffect = null;
  }
}