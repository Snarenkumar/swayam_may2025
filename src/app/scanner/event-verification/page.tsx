// app/page.tsx (or pages/index.tsx)
"use client";

import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useRouter } from "next/navigation";

interface QrScannerProps {
  onScanSuccess: (decodedText: string) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScanSuccess }) => {
  const qrCodeRegionId = "qr-scanner";
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const config = { fps: 10, qrbox: 250 };

    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode(qrCodeRegionId);
    }

    Html5Qrcode.getCameras().then((devices) => {
      if (devices && devices.length) {
        const cameraId = devices[0].id;

        scannerRef.current?.start(
          cameraId,
          config,
          (decodedText) => {
            onScanSuccess(decodedText);
          },
          (errorMessage) => {
            // Optionally handle errors here
            console.log(errorMessage);
          }
        );
      }
    });

    return () => {
      scannerRef.current?.stop().then(() => {
        scannerRef.current?.clear();
      });
    };
  }, []);

  return <div id={qrCodeRegionId} className="w-5/6 mx-auto" />;
};

export default function Home() {
  const router = useRouter();
  const handleScan = (id: string) => {
    router.push("/scanner/event-verification/" + id);
  };

  return (
    <div>
      <h1 className="mt-16 mb-5 text-2xl text-center font-semibold">
        Scan QR Code for verification
      </h1>
      <QrScanner onScanSuccess={handleScan} />
    </div>
  );
}
