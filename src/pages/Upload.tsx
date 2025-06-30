import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Image as ImageIcon,
  Type,
  Upload as UploadIcon
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";

// Import the correct watermark library
// Note: You'll need to install @be-tech/watermarkjs instead of watermarkjs
// npm install @be-tech/watermarkjs
import Watermark from "@be-tech/watermarkjs";

const Upload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState<string>("");
  const [watermarkPosition, setWatermarkPosition] = useState<string>("bottom-right");
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(50);
  const [watermarkSize, setWatermarkSize] = useState<number>(24);
  const [watermarkColor, setWatermarkColor] = useState<string>("#ffffff");
  const [watermarkEnabled, setWatermarkEnabled] = useState<boolean>(false);
  const [watermarkedImageUrl, setWatermarkedImageUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplyingWatermark, setIsApplyingWatermark] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      // Clear previous watermarked image
      if (watermarkedImageUrl) {
        URL.revokeObjectURL(watermarkedImageUrl);
        setWatermarkedImageUrl(null);
      }
    }
  };

  // Auto-apply watermark when settings change
  useEffect(() => {
    if (originalFile && watermarkEnabled && watermarkText.trim()) {
      applyWatermark();
    } else if (originalFile && !watermarkEnabled) {
      // Clear watermarked image if watermark is disabled
      if (watermarkedImageUrl) {
        URL.revokeObjectURL(watermarkedImageUrl);
        setWatermarkedImageUrl(null);
      }
    }
  }, [
    watermarkText,
    watermarkPosition,
    watermarkOpacity,
    watermarkSize,
    watermarkColor,
    watermarkEnabled,
    originalFile,
  ]);

  const applyWatermark = async () => {
    if (!originalFile || !watermarkText.trim()) return;

    setIsApplyingWatermark(true);
    
    try {
      // Clear previous watermarked image
      if (watermarkedImageUrl) {
        URL.revokeObjectURL(watermarkedImageUrl);
        setWatermarkedImageUrl(null);
      }

      // Create watermark instance using the correct library
      const watermark = Watermark.load(originalFile);
      
      // Apply text watermark with correct API
      await watermark.applyText({
        text: watermarkText,
        position: watermarkPosition,
        style: {
          size: `${watermarkSize}px`,
          family: "Arial, sans-serif",
          color: watermarkColor,
          weight: "normal",
        },
      });

      // Get the watermarked result
      const result = watermark.result;
      
      if (result && result.previewUrl) {
        setWatermarkedImageUrl(result.previewUrl);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error applying watermark:", error);
      alert("Failed to apply watermark. Please try again.");
    } finally {
      setIsApplyingWatermark(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);

      // Clean up object URLs
      if (watermarkedImageUrl) {
        URL.revokeObjectURL(watermarkedImageUrl);
      }
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    }, 2000);
  };

  const resetForm = () => {
    setUploadComplete(false);
    setPreviewUrl(null);
    setWatermarkedImageUrl(null);
    setOriginalFile(null);
    setWatermarkText("");
    setWatermarkEnabled(false);
  };

  return (
    <div className="w-screen min-h-screen bg-white">
      <Navigation />
      <div className="container mx-auto py-12 px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Upload Photo</h1>

        {uploadComplete ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Upload Complete!</h2>
            <p className="text-gray-600 mb-6">
              Your photo has been successfully uploaded.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={resetForm}>
                Upload Another
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/gallery")}
              >
                View Gallery
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Section */}
            <div className="space-y-2">
              <Label htmlFor="photo">Photo</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={
                        watermarkEnabled && watermarkedImageUrl
                          ? watermarkedImageUrl
                          : previewUrl
                      }
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-md"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => {
                        if (previewUrl) URL.revokeObjectURL(previewUrl);
                        if (watermarkedImageUrl) URL.revokeObjectURL(watermarkedImageUrl);
                        setPreviewUrl(null);
                        setOriginalFile(null);
                        setWatermarkedImageUrl(null);
                      }}
                    >
                      Change Photo
                    </Button>
                  </div>
                ) : (
                  <>
                    <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4 flex flex-col items-center">
                      <p className="text-sm text-gray-600">
                        Drag and drop your photo here, or
                      </p>
                      <label htmlFor="file-upload" className="mt-2 cursor-pointer">
                        <span className="text-primary font-medium">Browse files</span>
                        <Input
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter a title for your photo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your photo"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="surfers">Surfers</SelectItem>
                  <SelectItem value="waves">Waves</SelectItem>
                  <SelectItem value="beach">Beach</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Watermark Settings */}
            {previewUrl && (
              <div className="space-y-4 border border-gray-200 rounded-md p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon size={18} />
                    <Label className="font-medium">Watermark Settings</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="watermark-toggle" className="text-sm">
                      Enable Watermark
                    </Label>
                    <input
                      id="watermark-toggle"
                      type="checkbox"
                      className="h-4 w-4"
                      checked={watermarkEnabled}
                      onChange={(e) => setWatermarkEnabled(e.target.checked)}
                    />
                  </div>
                </div>

                {watermarkEnabled && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Type size={16} />
                        <Label htmlFor="watermark-text">Watermark Text</Label>
                      </div>
                      <Input
                        id="watermark-text"
                        value={watermarkText}
                        onChange={(e) => setWatermarkText(e.target.value)}
                        placeholder="© Your Name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="watermark-position">Position</Label>
                        <Select
                          value={watermarkPosition}
                          onValueChange={setWatermarkPosition}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="top-left">Top Left</SelectItem>
                            <SelectItem value="top">Top Center</SelectItem>
                            <SelectItem value="top-right">Top Right</SelectItem>
                            <SelectItem value="left">Middle Left</SelectItem>
                            <SelectItem value="center">Middle Center</SelectItem>
                            <SelectItem value="right">Middle Right</SelectItem>
                            <SelectItem value="bottom-left">Bottom Left</SelectItem>
                            <SelectItem value="bottom">Bottom Center</SelectItem>
                            <SelectItem value="bottom-right">Bottom Right</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="watermark-color">Color</Label>
                        <div className="flex gap-2">
                          <Input
                            id="watermark-color"
                            type="color"
                            value={watermarkColor}
                            onChange={(e) => setWatermarkColor(e.target.value)}
                            className="w-12 h-9 p-1"
                          />
                          <Input
                            value={watermarkColor}
                            onChange={(e) => setWatermarkColor(e.target.value)}
                            className="flex-1"
                            placeholder="#ffffff"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="watermark-size">
                          Size: {watermarkSize}px
                        </Label>
                        <Input
                          id="watermark-size"
                          type="range"
                          min="12"
                          max="72"
                          value={watermarkSize}
                          onChange={(e) => setWatermarkSize(parseInt(e.target.value))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="watermark-opacity">
                          Opacity: {watermarkOpacity}%
                        </Label>
                        <Input
                          id="watermark-opacity"
                          type="range"
                          min="10"
                          max="100"
                          value={watermarkOpacity}
                          onChange={(e) => setWatermarkOpacity(parseInt(e.target.value))}
                        />
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={applyWatermark}
                      disabled={!watermarkText.trim() || isApplyingWatermark}
                    >
                      {isApplyingWatermark ? (
                        <>
                          <div className="w-4 h-4 border-2 border-t-gray-600 rounded-full animate-spin mr-2"></div>
                          Applying Watermark...
                        </>
                      ) : (
                        "Preview Watermark"
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                min="1"
                step="0.01"
                placeholder="25.00"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isUploading || !previewUrl}
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-white rounded-full animate-spin mr-2"></div>
                  Uploading...
                </>
              ) : (
                "Upload Photo"
              )}
            </Button>
          </form>
        )}

        {/* Watermark Preview Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
              <h2 className="text-xl font-semibold mb-4">Watermark Preview</h2>
              {watermarkedImageUrl && (
                <img 
                  src={watermarkedImageUrl} 
                  alt="Watermarked Preview" 
                  className="max-h-96 mx-auto rounded-md"
                />
              )}
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={closeModal}>
                  Close
                </Button>
                <Button onClick={closeModal}>
                  Apply Watermark
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;