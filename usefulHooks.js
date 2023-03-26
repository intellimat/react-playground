/*
 * custom hook for getting previous state
 */
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useEffectAfterMount = (callback, dependencies) => {
  const componentJustMounted = useRef(true);

  useEffect(() => {
    let cleanupCallback;
    if (!componentJustMounted.current) {
      cleanupCallback = callback();
    }
    componentJustMounted.current = false;
    if (cleanupCallback) return cleanupCallback;
  }, dependencies);
};

const useDOMRef = () => {
  const [DOMRef, setDOMRef] = useState({});
  const setRef = useCallback((node) => {
    if (node !== null) {
      setDOMRef((prevDOMRefs) => ({
        ...prevDOMRefs,
        [node.dataset.refkey]: node,
      }));
    }
  }, []);

  return [DOMRef, setRef];
};
