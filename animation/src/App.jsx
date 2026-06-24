import IntroSceneV2B from "./components/IntroSceneV2B";
import IntroSceneV3 from "./components/IntroSceneV3";
import "./App.css";

// Detect mobile/tablet by touch capability or screen width
const isMobile =
  /Mobi|Android|iPhone|iPad|iPod|Touch/i.test(navigator.userAgent) ||
  window.matchMedia("(max-width: 768px)").matches;

export default function App() {
  return isMobile ? <IntroSceneV2B /> : <IntroSceneV3 />;
}
