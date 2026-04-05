"use client";

import type { ImageItem } from "@/types";
import ProcessingOverlay from "./ImagePreview/ProcessingOverlay";
import PendingOverlay from "./ImagePreview/PendingOverlay";
import ErrorCard from "./ImagePreview/ErrorCard";
import BeforeAfterSlider from "./ImagePreview/BeforeAfterSlider";
import ActionBar from "./ImagePreview/ActionBar";

export default function ComparisonSlider({
  active,
  progress,
  sliderPos,
  setSliderPos,
  isRevealing,
  onDownload,
  onEdit,
}: {
  active: ImageItem;
  progress: string;
  sliderPos: number;
  setSliderPos: (pos: number) => void;
  isRevealing: boolean;
  onDownload: () => void;
  onEdit: () => void;
}) {
  if (active.status === "processing") {
    return <ProcessingOverlay image={active} progress={progress} />;
  }

  if (active.status === "pending") {
    return <PendingOverlay image={active} />;
  }

  if (active.status === "error") {
    return <ErrorCard image={active} />;
  }

  if (active.status === "done" && active.resultUrl) {
    return (
      <div className="space-y-3">
        <BeforeAfterSlider
          originalUrl={active.originalUrl}
          resultUrl={active.resultUrl}
          sliderPos={sliderPos}
          setSliderPos={setSliderPos}
          isRevealing={isRevealing}
        />
        <ActionBar
          name={active.name}
          onEdit={onEdit}
          onDownload={onDownload}
        />
      </div>
    );
  }

  return null;
}
