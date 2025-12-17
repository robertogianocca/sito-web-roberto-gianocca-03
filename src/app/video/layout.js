// ========== LAYOUT - VIDEO ========== //

import Background from "@/components/Background/Background";

export default async function VideoLayout({ children }) {
  return (
    <>
      <Background color="#456DFF" />
      {children}
    </>
  );
}
