import { useEffect, useRef } from 'react';
import isEqual from 'lodash-es/isEqual';

/**
 * useEffect hook but does a deep search if dependencies are truly equal
 * See {@link https://marcoghiani.com/blog/how-to-use-the-react-hook-usedeepeffect#the-solution}
 * @param {function} effectFunc function to call 
 * @param {Array} deps dependencies 
 */
const useDeepEffect = (effectFunc, deps) => {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps);

  useEffect(() => {
    const isSame = prevDeps.current.every((obj, index) => isEqual(obj, deps[index]));
    if (isFirst.current || !isSame) {
      effectFunc();
    }
    isFirst.current = false;
    prevDeps.current = deps;
  }, deps);
}

export default useDeepEffect;