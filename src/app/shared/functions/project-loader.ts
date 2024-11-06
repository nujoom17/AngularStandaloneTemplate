export function loadScript(src: string, type: 'text/javascript' | 'module' = 'text/javascript'): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.type = type;
    script.onload = () => resolve();
    script.onerror = () => reject(`Failed to load script: ${src}`);
    document.body.appendChild(script);
  });
}