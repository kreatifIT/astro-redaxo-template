import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import type { OptionsType } from "@fancyapps/ui/types/Fancybox/options";
import { useEffect, useRef } from "preact/hooks";

interface Props {
    delegate?: string;
    options?: Partial<OptionsType>;
    children: any;
}

export default function Fancybox({delegate = '[data-fancybox]', options = {}, children}: Props) {
    const containerRef = useRef(null);
  
    useEffect(() => {
      const container = containerRef.current;
  
      NativeFancybox.bind(container, delegate, options);
  
      return () => {
        NativeFancybox.unbind(container);
        NativeFancybox.close();
      };
    });
  
    return <div ref={containerRef}>{children}</div>;
  }