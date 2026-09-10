import type { App } from "vue";

import DefaultTheme from "vitepress/theme";

import CCActivitySparkline from "./components/CCActivitySparkline.vue";
import CCChapterOverview from "./components/CCChapterOverview.vue";
import CCDailyQuote from "./components/CCDailyQuote.vue";
import "./style/index.css";
import "./custom.css";
import "@waline/client/style";

import CCPdfDownloadButton from "./components/CCPdfDownloadButton.vue";
import CCSiteSettings from "./components/CCSiteSettings.vue";
import CCShare from "./components/shortUrl/CCShare.vue";
import layout from "./layout.vue";

// Interactive Biology Components
import ProteinCondensationCalc from "./components/interactive/ProteinCondensationCalc.vue";
import MembraneTransportSimulator from "./components/interactive/MembraneTransportSimulator.vue";
import RespirationRqDropletShift from "./components/interactive/RespirationRqDropletShift.vue";
import PhotosynthesisSimulator from "./components/interactive/PhotosynthesisSimulator.vue";
import CellDivisionTimeline from "./components/interactive/CellDivisionTimeline.vue";
import PunnettSquarePuzzle from "./components/interactive/PunnettSquarePuzzle.vue";
import MeselsonStahlCentrifuge from "./components/interactive/MeselsonStahlCentrifuge.vue";
import HardyWeinbergSimulator from "./components/interactive/HardyWeinbergSimulator.vue";
import ActionPotentialOscilloscope from "./components/interactive/ActionPotentialOscilloscope.vue";
import AuxinSensitivityProbe from "./components/interactive/AuxinSensitivityProbe.vue";
import PopulationGrowthSandbox from "./components/interactive/PopulationGrowthSandbox.vue";
import EnergyFlowBalance from "./components/interactive/EnergyFlowBalance.vue";
import PcrCycleVisualizer from "./components/interactive/PcrCycleVisualizer.vue";
import BiochemicalStainingPalette from "./components/interactive/BiochemicalStainingPalette.vue";

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
  },
};
