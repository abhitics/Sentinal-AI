# ==============================
# AI HUMAN ACTIVITY INFERENCE
# ==============================

import cv2
import numpy as np

try:
    from ultralytics import YOLO
    # Using yolo11x for maximum accuracy and precision
    model = YOLO("yolo11x.pt")  
    USE_YOLO = True
except Exception as e:
    print(f"YOLO not available ({e}), switching to OpenCV only...")
    USE_YOLO = False

def analyze_image(image_path):
    try:
        from PIL import Image
        pil_img = Image.open(image_path).convert('RGB')
        img = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
    except Exception as e:
        raise ValueError(f"Could not read image (it may be an unsupported format): {e}")

    original = img.copy()
    humans_detected = 0

    if USE_YOLO:
        # Enabled advanced Test-Time Augmentation (TTA) with `augment=True`.
        # This makes the model analyze the image at multiple scales and flips 
        # to guarantee the highest theoretical accuracy and precision possible.
        # conf=0.10 captures even the most obscured/distant individuals.
        results = model(image_path, conf=0.10, imgsz=1024, iou=0.45, augment=True)
        for r in results:
            boxes = r.boxes
            for box in boxes:
                # Class 0 is 'person' in COCO dataset
                cls = int(box.cls[0])
                if cls == 0:
                    humans_detected += 1
                    # Draw bounding box for human
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    conf = float(box.conf[0])
                    
                    # Draw green box
                    cv2.rectangle(original, (x1, y1), (x2, y2), (0, 255, 0), 2)
                    
                    # Draw label
                    label_text = f"Human {conf:.2f}"
                    cv2.putText(original, label_text, (x1, max(20, y1 - 10)),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

        regions = humans_detected
        
        # Scoring based on actual human detection
        score = 0
        if humans_detected > 0:
            # Base score for detecting human
            score = 60 + (humans_detected * 10)
        else:
            score = 10
            
        score = min(score, 100)
    else:
        # OpenCV fallback logic (unchanged but used only if YOLO fails)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 100, 200)
        contours, _ = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        regions = len(contours)
        
        edge_density = np.sum(edges > 0) / (img.shape[0] * img.shape[1])
        texture = np.std(gray)
        pattern_score = 1 if regions > 5 else 0

        score = 0
        if regions > 15: score += 40
        elif regions > 8: score += 30
        elif regions > 3: score += 20
        else: score += 10

        if edge_density > 0.1: score += 30
        elif edge_density > 0.05: score += 20

        if texture > 60: score += 20
        elif texture > 40: score += 10

        if pattern_score: score += 10
        score = min(score, 100)

    # LABEL GENERATION
    if score > 70:
        label = "HIGH ACTIVITY"
        confidence = "HIGH"
    elif score > 40:
        label = "MEDIUM ACTIVITY"
        confidence = "MEDIUM"
    else:
        label = "LOW ACTIVITY"
        confidence = "LOW"

    # OUTPUT IMAGE TEXT
    text = f"Activity: {score}% | {confidence} | Humans: {humans_detected if USE_YOLO else regions}"
    # Add a background box for text readability
    (tw, th), _ = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 0.8, 2)
    cv2.rectangle(original, (15, 15), (25 + tw, 45 + th), (0, 0, 0), -1)
    cv2.putText(original, text, (20, 40),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 255), 2)

    output_path = "output.jpg"
    cv2.imwrite(output_path, original)

    return {
        "score": score,
        "label": confidence, # We use confidence as label for the frontend (HIGH, MEDIUM, LOW)
        "confidence": confidence,
        "regions_detected": humans_detected if USE_YOLO else regions,
        "output_image": output_path
    }

if __name__ == "__main__":
    import sys
    img_name = sys.argv[1] if len(sys.argv) > 1 else "med2.jpg"
    result = analyze_image(img_name)

    print("\n===== RESULT =====")
    print(f"Human Activity Likelihood: {result['score']}%")
    print(f"Confidence: {result['confidence']}")
    print(f"Humans Detected: {result['regions_detected']}")
    print(f"Output Image Saved: {result['output_image']}")