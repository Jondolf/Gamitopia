import { ref } from 'vue';

export default function useGodotLoader() {
  const canvas = ref<HTMLCanvasElement>(null!)
  const statusProgress = ref<HTMLDivElement>(null!)
  const statusProgressInner = ref<HTMLDivElement>(null!)
  const statusIndeterminate = ref<HTMLDivElement>(null!)
  const statusNotice = ref<HTMLDivElement>(null!)

  function loadGame(buildUrl: string, fileName: string) {
    const script = document.createElement('script');
    script.src = `${buildUrl}/${fileName}.js`;
    script.onload = () => {
      const INDETERMINATE_STATUS_STEP_MS = 100;
      // @ts-ignore
      const engine = new Engine;

      let initializing = true;
      let statusMode = 'hidden';

      let animationCallbacks: Function[] = [];

      function animate(time: number) {
        animationCallbacks.forEach(callback => callback(time));
        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);

      function adjustCanvasDimensions() {
        const scale = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.value.width = width * scale;
        canvas.value.height = height * scale;
        canvas.value.style.width = width + "px";
        canvas.value.style.height = height + "px";
      }
      animationCallbacks.push(adjustCanvasDimensions);
      adjustCanvasDimensions();

      const setStatusMode = (mode: string) => {
        if (statusMode === mode || !initializing)
          return;
        [statusProgress, statusIndeterminate, statusNotice].forEach(elem => {
          elem.value.style.display = 'none';
        });
        animationCallbacks = animationCallbacks.filter(function (value) {
          return (value != animateStatusIndeterminate);
        });
        switch (mode) {
          case 'progress':
            statusProgress.value.style.display = 'block';
            break;
          case 'indeterminate':
            statusIndeterminate.value.style.display = 'block';
            animationCallbacks.push(animateStatusIndeterminate);
            break;
          case 'notice':
            statusNotice.value.style.display = 'block';
            break;
          case 'hidden':
            break;
          default:
            throw new Error('Invalid status mode');
        }
        statusMode = mode;
      }

      function animateStatusIndeterminate(ms: number) {
        const i = Math.floor(ms / INDETERMINATE_STATUS_STEP_MS % 8);
        if ((statusIndeterminate.value.children[i] as HTMLElement).style.borderTopColor == '') {
          Array.prototype.slice.call(statusIndeterminate.value.children).forEach(child => {
            child.style.borderTopColor = '';
          });
          (statusIndeterminate.value.children[i] as HTMLElement).style.borderTopColor = '#dfdfdf';
        }
      }

      const setStatusNotice = (text: string) => {
        while (statusNotice.value.lastChild) {
          statusNotice.value.removeChild(statusNotice.value.lastChild);
        }
        const lines = text.split('\n');
        lines.forEach((line) => {
          statusNotice.value.appendChild(document.createTextNode(line));
          statusNotice.value.appendChild(document.createElement('br'));
        });
      }

      engine.setProgressFunc((current: number, total: number) => {
        if (total > 0) {
          statusProgressInner.value.style.width = current / total * 100 + '%';
          setStatusMode('progress');
          if (current === total) {
            // Wait for progress bar animation
            setTimeout(() => {
              setStatusMode('indeterminate');
            }, 500);
          }
        } else {
          setStatusMode('indeterminate');
        }
      })

      function displayFailureNotice(err: any) {
        const msg = err.message || err;
        console.error(msg);
        setStatusNotice(msg);
        setStatusMode('notice');
        initializing = false;
      }
      // @ts-ignore
      if (!Engine.isWebGLAvailable()) {
        displayFailureNotice('WebGL not available');
      } else {
        setStatusMode('indeterminate');
        console.log(canvas.value);
        engine.setCanvas(canvas.value);
        engine.startGame(`${buildUrl}/${fileName}`, `${buildUrl}/${fileName}.pck`).then(() => {
          setStatusMode('hidden');
          initializing = false;
        }, displayFailureNotice);
      }
    }
    document.body.appendChild(script);
  }

  return {
    canvas,
    statusProgress,
    statusProgressInner,
    statusIndeterminate,
    statusNotice,
    loadGame
  }
}
