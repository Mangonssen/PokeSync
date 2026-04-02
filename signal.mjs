// Code written by Tim; Docs By Claude Haiku 4.5 through duck.ai
let currentDependent = null;

/**
 * @template T
 * @typedef {[()=>T,(val:T)=>void]} Signal<T>
 */

/**
 * Creates a reactive signal with automatic dependency tracking.
 * 
 * A signal is a container for a value that notifies all dependent effects
 * whenever the value changes. Dependencies are tracked implicitly: any signal
 * read during an effect execution is automatically registered as a dependency.
 * 
 * @template T
 * @param {T} init - The initial value of the signal
 * @returns {Signal<T>} A tuple containing [getter, setter]:
 *   - getter: `() => T` - Reads the signal value and registers as a dependent if called within an effect
 *   - setter: `(val: T) => void` - Updates the signal value and triggers all dependent effects
 * 
 * @example
 * const [count, setCount] = useSignal(0);
 * 
 * useEffect((count) => {
 *   console.log('Count is:', count);
 * }, [count]);
 * 
 * setCount(1); // Logs: "Count is: 1"
 * setCount(2); // Logs: "Count is: 2"
 */
export function useSignal(init) {
    let state = init;
    /** @type {Set<Function>} */
    let deps = new Set();

    return [
        () => {
            // Track this effect as a dependent of this signal
            if (currentDependent) {
                deps.add(currentDependent);
            }
            return state;
        },
        (val) => {
            state = val;
            deps.forEach(dep => {
                try {
                    dep();
                } catch (error) {
                    console.error('Error in dependent effect:', error);
                }
            });
        }
    ];
}

/**
 * Registers an effect that runs whenever its signal dependencies change.
 * 
 * Effects are functions that perform side effects (logging, API calls, DOM updates, etc.)
 * and receive the current values of their dependencies as parameters. When any of those 
 * dependencies change, the effect re-runs automatically with the new values.
 * 
 * @param {(...values: any[]) => void | (() => void)} fn - Effect function that receives
 *   the current values of each dependency as separate parameters. May optionally return 
 *   a cleanup function that runs before the effect re-executes.
 * @param {Array<Signal<any>>} depArray - Array of signals (Signal tuples) to watch.
 *   The getter function of each signal will be called and its value passed to fn.
 * 
 * @returns {void}
 * 
 * @example
 * const [name, setName] = useSignal('Alice');
 * const [age, setAge] = useSignal(25);
 * 
 * useEffect((name, age) => {
 *   console.log(`${name} is ${age} years old`);
 *   
 *   // Optional cleanup function
 *   return () => {
 *     console.log('Cleaning up effect');
 *   };
 * }, [name, age]);
 * 
 * setName('Bob'); // Logs: "Cleaning up effect", then "Bob is 25 years old"
 * setAge(26);    // Logs: "Cleaning up effect", then "Bob is 26 years old"
 */
export function useEffect(fn, depArray = []) {
    currentDependent = () => {
        const values = depArray.map((dep) => dep[0]());
        const cleanup = fn(...values);
        if (typeof cleanup === 'function') {
            currentDependent.cleanup = cleanup;
        }
    };

    try {
        currentDependent();
    } finally {
        currentDependent = null;
    }
}
