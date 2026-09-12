import type { App } from "vue";

import DefaultTheme from "vitepress/theme";
import { defineAsyncComponent } from "vue";

import CCActivitySparkline from "./components/CCActivitySparkline.vue";
import CCChapterOverview from "./components/CCChapterOverview.vue";
import CCDailyQuote from "./components/CCDailyQuote.vue";
import "./style/index.css";
import "./custom.css";
import "@waline/client/style";

import CCPdfDownloadButton from "./components/CCPdfDownloadButton.vue";
import CCSiteSettings from "./components/CCSiteSettings.vue";
import CCShare from "./components/shortUrl/CCShare.vue";
import CCTomorrowLetter from "./components/specialPage/CCTomorrowLetter.vue";
import layout from "./layout.vue";

// Interactive Biology Components（按需懒加载，避免首屏全量打包）
const ProteinCondensationCalc = defineAsyncComponent(
  () => import("./components/interactive/ProteinCondensationCalc.vue"),
);
const MembraneTransportSimulator = defineAsyncComponent(
  () => import("./components/interactive/MembraneTransportSimulator.vue"),
);
const RespirationRqDropletShift = defineAsyncComponent(
  () => import("./components/interactive/RespirationRqDropletShift.vue"),
);
const PhotosynthesisSimulator = defineAsyncComponent(
  () => import("./components/interactive/PhotosynthesisSimulator.vue"),
);
const CellDivisionTimeline = defineAsyncComponent(
  () => import("./components/interactive/CellDivisionTimeline.vue"),
);
const PunnettSquarePuzzle = defineAsyncComponent(
  () => import("./components/interactive/PunnettSquarePuzzle.vue"),
);
const MeselsonStahlCentrifuge = defineAsyncComponent(
  () => import("./components/interactive/MeselsonStahlCentrifuge.vue"),
);
const HardyWeinbergSimulator = defineAsyncComponent(
  () => import("./components/interactive/HardyWeinbergSimulator.vue"),
);
const ActionPotentialOscilloscope = defineAsyncComponent(
  () => import("./components/interactive/ActionPotentialOscilloscope.vue"),
);
const AuxinSensitivityProbe = defineAsyncComponent(
  () => import("./components/interactive/AuxinSensitivityProbe.vue"),
);
const PopulationGrowthSandbox = defineAsyncComponent(
  () => import("./components/interactive/PopulationGrowthSandbox.vue"),
);
const EnergyFlowBalance = defineAsyncComponent(
  () => import("./components/interactive/EnergyFlowBalance.vue"),
);
const PcrCycleVisualizer = defineAsyncComponent(
  () => import("./components/interactive/PcrCycleVisualizer.vue"),
);
const BiochemicalStainingPalette = defineAsyncComponent(
  () => import("./components/interactive/BiochemicalStainingPalette.vue"),
);
const TissueEdemaDiagnoser = defineAsyncComponent(
  () => import("./components/interactive/TissueEdemaDiagnoser.vue"),
);
const PedigreeAnalysisSolver = defineAsyncComponent(
  () => import("./components/interactive/PedigreeAnalysisSolver.vue"),
);

export default {
  extends: DefaultTheme,
  Layout: layout,
  enhanceApp({ app }: { app: App }) {
    app.component("CCPdfDownloadButton", CCPdfDownloadButton);
    app.component("CCSiteSettings", CCSiteSettings);
    app.component("CCShare", CCShare);
    app.component("CCChapterOverview", CCChapterOverview);
    app.component("CCActivitySparkline", CCActivitySparkline);
    app.component("CCDailyQuote", CCDailyQuote);
    app.component("CCTomorrowLetter", CCTomorrowLetter);

    // Interactive Biology Models
    app.component("ProteinCondensationCalc", ProteinCondensationCalc);
    app.component("MembraneTransportSimulator", MembraneTransportSimulator);
    app.component("RespirationRqDropletShift", RespirationRqDropletShift);
    app.component("PhotosynthesisSimulator", PhotosynthesisSimulator);
    app.component("CellDivisionTimeline", CellDivisionTimeline);
    app.component("PunnettSquarePuzzle", PunnettSquarePuzzle);
    app.component("MeselsonStahlCentrifuge", MeselsonStahlCentrifuge);
    app.component("HardyWeinbergSimulator", HardyWeinbergSimulator);
    app.component("ActionPotentialOscilloscope", ActionPotentialOscilloscope);
    app.component("AuxinSensitivityProbe", AuxinSensitivityProbe);
    app.component("PopulationGrowthSandbox", PopulationGrowthSandbox);
    app.component("EnergyFlowBalance", EnergyFlowBalance);
    app.component("PcrCycleVisualizer", PcrCycleVisualizer);
    app.component("BiochemicalStainingPalette", BiochemicalStainingPalette);
    app.component("TissueEdemaDiagnoser", TissueEdemaDiagnoser);
    app.component("PedigreeAnalysisSolver", PedigreeAnalysisSolver);
  },
};
