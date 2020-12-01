import { ref } from 'vue';

export default function useUnityLoader() {
  const container = ref<HTMLDivElement>(null!);
  const canvas = ref<HTMLElement>(null!);
  const loadingBar = ref<HTMLElement>(null!);
  const progressBarFull = ref<HTMLElement>(null!);
  const fullscreenButton = ref<HTMLElement>(null!);

  function loadGame(buildUrl: string, fileName: string, gameName: string, gameVersion: string, isGzipped: boolean) {
    const loaderUrl = `${buildUrl}/${fileName}.asm.loader.js`;
    const config = {
      dataUrl: `${buildUrl}/${fileName}.data${isGzipped ? '.gz' : ''}`,
      frameworkUrl: `${buildUrl}/${fileName}.asm.framework.js${isGzipped ? '.gz' : ''}`,
      codeUrl: `${buildUrl}/${fileName}.asm.js${isGzipped ? '.gz' : ''}`,
      memoryUrl: `${buildUrl}/${fileName}.asm.mem${isGzipped ? '.gz' : ''}`,
      streamingAssetsUrl: 'StreamingAssets',
      companyName: 'Gamitopia',
      productName: gameName,
      productVersion: gameVersion,
    };

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      container.value.className = 'unity-game unity-mobile';
    }
    loadingBar.value.style.display = 'block';

    const script = document.createElement('script');
    script.src = loaderUrl;
    script.onload = () => {
      // @ts-ignore
      createUnityInstance(canvas.value, config, (progress: number) => {
        progressBarFull.value.style.width = 100 * progress + '%';
      }).then((unityInstance: any) => {
        loadingBar.value.style.display = 'none';
        fullscreenButton.value.onclick = () => {
          unityInstance.SetFullscreen(1);
        };
      }).catch((message: string) => {
        alert(message);
      });
    };
    document.body.appendChild(script);
  }

  return {
    container,
    canvas,
    loadingBar,
    progressBarFull,
    fullscreenButton,
    loadGame
  }
}