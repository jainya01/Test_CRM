import AppointmentBooking from "./pages/AppointmentBooking";
import Attestation from "./pages/Attestation";
import Documentation from "./pages/Documentation";
import Emigration from "./pages/Emigration";
import HajjBooking from "./pages/HajjBooking";
import MedicalTest from "./pages/MedicalTest";
import OTB from "./pages/OTB";
import PassportAssistance from "./pages/PassportAssistance";
import TicketBooking from "./pages/TicketBooking";
import UmrahBooking from "./pages/UmrahBooking";
import VisaStamping from "./pages/VisaStamping";

export const serviceMapper = {
  attestation: Attestation,
  documentation: Documentation,
  emigration: Emigration,
  "medical-test-gcc": MedicalTest,
  "otb-services": OTB,
  "visa-stamping": VisaStamping,
  "passport-assistance": PassportAssistance,
  "appointment-booking": AppointmentBooking,
  hajj: HajjBooking,
  umrah: UmrahBooking,
  ticketing: TicketBooking,
};
