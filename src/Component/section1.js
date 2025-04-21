import { FaRegCheckSquare } from "react-icons/fa";

export function RealTimeMonitoring() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-10 py-16 bg-white">
      {/* Left Content */}
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Real-Time Monitoring</h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo
          ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <FaRegCheckSquare className="text-blue-500 text-2xl" />
            <div>
              <h3 className="text-lg font-semibold">Title Goes Here</h3>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <FaRegCheckSquare className="text-blue-500 text-2xl" />
            <div>
              <h3 className="text-lg font-semibold">Title Goes Here</h3>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
        <img
          src="/undraw_monitoring.svg"
          alt="Real-Time Monitoring"
          className="max-w-sm"
        />
      </div>
    </section>
  );
}
