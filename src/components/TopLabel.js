export default function TopLabel({ label, value }) {
  return (
    <div className="topLabel" style={{ fontSize: 12, lineHeight: "16px", padding: "0 10px" }}>
      <div style={{ color: "#727b83" }}>{label}</div>
      <div>{value}</div>
    </div>
  );
}
