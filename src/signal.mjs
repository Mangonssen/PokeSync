/** @type {Effect|null} */
let currentEffect = null;

/**
 * @template T
 */
export class Signal {
  /** @type {T} */
  _value;

  /** @type {Set<Effect>} */
  _dependents;

  /** 
   * @param {T} init 
   */
  constructor(init) {
    this._value = init;
    this._dependents = new Set();
  }

  /**
   @template {Record<string,any>} Obj
   @param {Obj} init 
   @returns {
   {
    [K in keyof Obj]: Signal<Obj[K]>
   }
   }
   */
  static SubSignal(init) {
    /** @type {Partial<{ [K in keyof Obj]: Signal<Obj[K]> }>} */
    let obj = {};
    for (const key of Object.keys(init)) {
      const k = /** @type {keyof Obj} */ (key);
      obj[k] = new Signal(init[k]);
    }
    return /** @type {{ [K in keyof Obj]: Signal<Obj[K]> }} */(obj)
  }

  /**
 * @template {Record<string, Signal<any>>} T
 * @param {T} obj
 * @returns {{ [K in keyof T]: import("./datatypes.mjs").Unsignal<T[K]> }}
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

  get value() {
    if (currentEffect) {
      this._dependents.add(currentEffect);
    }
    return this._value;
  }
  set value(value) {
    this._value = value;
    this.signalDependents();
  }
  signalDependents() {
    this._dependents.forEach((dep) => dep.run());
  }
}

/**
 * @template T
 */
export class Derived {
  /** 
   * @private
   * @type {T|undefined} 
   */
  _value = undefined;
  /**
   * @private
   * @type {Effect}
   */
  _effect;
  /** 
   * @private
   * @type {Set<Effect>} 
   */
  _dependents;

  /**
   * @param {()=>T} func 
   */
  constructor(func) {
    this._dependents = new Set();
    this._effect = new Effect(() => { this.value = func(); });
  }
  signalDependents() {
    this._dependents.forEach((dep) => dep.run());
  }
  /** @private */
  set value(val) {
    this._value = val;
    this.signalDependents();
  }

  /**
   * @throws - Unrechable: uninited value"
   * @returns {T} 
   */
  get value() {
    if (this._value === undefined) {
      throw new Error("Unrechable: uninited value");
    }
    return this._value;
  }
}

export class Effect {
  /** 
   * @private
   * @type {()=>Function|undefined|void}}
   */
  _func;
  /** 
   * @private
   * @type {Function|undefined|void} 
   */
  _cleanUp;

  /**
   * @param {()=>Function|undefined|void} func 
   */
  constructor(func, andRun = true) {
    this._func = func;
    this._cleanUp = undefined;

    if (andRun) {
      this.run();
    }
  }

  /** @throws - if effects are stacked */
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
