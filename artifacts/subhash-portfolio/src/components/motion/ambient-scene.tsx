export function AmbientScene() {
  return (
    <div className="ambient-depth-environment" aria-hidden="true">
      {/* Clean Architectural Dot Grid */}
      <div className="ambient-grid-overlay" />

      {/* Organic Noise Grain */}
      <div className="ambient-grain" />
    </div>
  );
}
