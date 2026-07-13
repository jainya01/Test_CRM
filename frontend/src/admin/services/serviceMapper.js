import Appointment from "./pages/Appointment";
import Attestation from "./pages/Attestation";
import Documentation from "./pages/Documentation";
import Emigration from "./pages/Emigration";
import MedicalTest from "./pages/MedicalTest";
import OTB from "./pages/OTB";
import Passport from "./pages/Passport";
import VisaStamping from "./pages/VisaStamping";

export const serviceMapper = {
  attestation: Attestation,
  documentation: Documentation,
  emigration: Emigration,
  "medical-test": MedicalTest,
  otb: OTB,
  "visa-stamping": VisaStamping,
  passport: Passport,
  appointment: Appointment,
};
