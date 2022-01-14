import React, {useEffect,useRef } from 'react'
import { RealsTopixel } from 'src/utils/lib'



export default function useIntersectionObserver(root, callback, externalRef){
    const ref = useRef()
    useEffect(() => {
      const element = externalRef ? externalRef.current : ref.current
  
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }
      }, {
        root,
        rootMargin: RealsTopixel(5) + 'px'
      })
      if (element) {
        observer.observe(element)
      }
      return () => {
        observer.disconnect()
      }
    }, [externalRef, ref])
    return ref
  }