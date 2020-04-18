import {
    useEffect,
    useRef
} from "react";

type HandlerType = () => void;

// calls handler on window scroll and resize events
const useWindowChangeListener = (handler: HandlerType) => {
    const savedHandler = useRef<HandlerType>();

    useEffect(
        () => {
            savedHandler.current = handler;
        }, 
        [handler]
    );

    useEffect(
        () => {
            const eventListener = () => (savedHandler.current as HandlerType)();
            window.addEventListener("scroll", eventListener);
            window.addEventListener("resize", eventListener);
    
            return () => {
                window.removeEventListener("scroll", eventListener);
                window.removeEventListener("resize", eventListener);
            };
        },
        []
    );
}

export { useWindowChangeListener };
