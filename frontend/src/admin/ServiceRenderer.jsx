import { useParams } from "react-router-dom";
import { serviceMapper } from "./services/serviceMapper";

export default function ServiceRenderer() {
  const { slug } = useParams();
  const Component = serviceMapper[slug];

  if (!Component) {
    return <h5>Service Not Found</h5>;
  }

  return <Component />;
}
