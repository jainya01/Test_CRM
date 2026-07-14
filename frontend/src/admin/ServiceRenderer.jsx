import { useParams, Link } from "react-router-dom";
import { serviceMapper } from "./services/serviceMapper";

export default function ServiceRenderer() {
  const { slug } = useParams();

  const Component = serviceMapper[slug];

  if (!Component) {
    return (
      <div className="service-not-found">
        <h1>404</h1>
        <h3>Service Not Found</h3>
        <p>The requested service is not available.</p>

        <Link to="/admin/services" className="back-service-btn">
          Back to Services
        </Link>
      </div>
    );
  }

  return <Component />;
}
