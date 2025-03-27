"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Star } from "lucide-react";
import AnimationPlayer from "@/components/animation-player";
import CommentSection from "@/components/comment-section";
import RelatedAnimations from "@/components/related-animations";
import { Button } from "@/components/ui/button";
import { useAnimationById } from "@/hooks/use-getDataById";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const animationCode = `
  export default LagrangeMultiplier3D = () => {
    const mountRef = useRef(null);
    const [animationStep, setAnimationStep] = useState(0);

    useEffect(() => {
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);

      // Camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(3, 3, 3);
      camera.lookAt(0, 0, 0);

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(600, 400);
      mountRef.current.appendChild(renderer.domElement);

      // Constraint Surface (Sphere)
      const constraintGeometry = new THREE.SphereGeometry(1, 32, 32);
      const constraintMaterial = new THREE.MeshBasicMaterial({
        color: 0x3333ff,
        transparent: true,
        opacity: 0.3
      });
      const constraintMesh = new THREE.Mesh(constraintGeometry, constraintMaterial);
      scene.add(constraintMesh);

      // Optimization Point
      const pointGeometry = new THREE.SphereGeometry(0.1);
      const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const pointMesh = new THREE.Mesh(pointGeometry, pointMaterial);
      scene.add(pointMesh);

      // Gradient Line
      const gradientMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
      const gradientPoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, 1, 0)
      ];
      const gradientGeometry = new THREE.BufferGeometry().setFromPoints(gradientPoints);
      const gradientLine = new THREE.Line(gradientGeometry, gradientMaterial);
      scene.add(gradientLine);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);

      // Mouse interaction
      let isDragging = false;
      let previousMousePosition = {
        x: 0,
        y: 0
      };

      const onMouseMove = (e) => {
        if (!isDragging) return;

        const deltaMove = {
          x: e.offsetX - previousMousePosition.x,
          y: e.offsetY - previousMousePosition.y
        };

        // Rotate camera
        const deltaRotationQuaternion = new THREE.Quaternion()
          .setFromEuler(new THREE.Euler(
            toRadians(deltaMove.y * 1),
            toRadians(deltaMove.x * 1),
            0,
            'XYZ'
          ));

        const currentRotation = new THREE.Quaternion().copy(camera.quaternion);
        currentRotation.multiplyQuaternions(deltaRotationQuaternion, currentRotation);
        camera.quaternion.copy(currentRotation);

        previousMousePosition = {
          x: e.offsetX,
          y: e.offsetY
        };
      };

      const onMouseDown = (e) => {
        isDragging = true;
        previousMousePosition = {
          x: e.offsetX,
          y: e.offsetY
        };
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      // Convert degrees to radians
      function toRadians(angle) {
        return angle * (Math.PI / 180);
      }

      renderer.domElement.addEventListener('mousemove', onMouseMove, false);
      renderer.domElement.addEventListener('mousedown', onMouseDown, false);
      renderer.domElement.addEventListener('mouseup', onMouseUp, false);

      // Animation function
      const animate = () => {
        requestAnimationFrame(animate);

        // Animate point based on optimization step
        switch(animationStep) {
          case 0:
            pointMesh.position.set(1/Math.sqrt(2), 1/Math.sqrt(2), 0);
            break;
          case 1:
            pointMesh.position.set(0.7, 0.7, 0.2);
            break;
          case 2:
            pointMesh.position.set(0.5, 0.5, 0.5);
            break;
          case 3:
            pointMesh.position.set(1/Math.sqrt(2), 1/Math.sqrt(2), 0);
            break;
        }

        renderer.render(scene, camera);
      };

      animate();

      // Cleanup
      return () => {
        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.domElement.removeEventListener('mousemove', onMouseMove);
        renderer.domElement.removeEventListener('mousedown', onMouseDown);
        renderer.domElement.removeEventListener('mouseup', onMouseUp);
      };
    }, [animationStep]);

    const handleNextStep = () => {
      setAnimationStep((prevStep) => (prevStep + 1) % 4);
    };

    const stepDescriptions = [
      "Initial Constraint Surface",
      "Gradient Computation",
      "Optimization Progress",
      "Optimal Point Found"
    ];

    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          3D Lagrange Multiplier Visualization
        </h2>

        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={handleNextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next Step
          </button>

          <div className="text-gray-700">
            {stepDescriptions[animationStep]}
          </div>
        </div>

        <div
          ref={mountRef}
          className="w-full flex justify-center"
        />
      </div>
    );
  };
`;

export default function AnimationPage() {
  const params = useParams();
  const { id } = params;
  const {
    data: animation,
    isLoading,
    isError,
    error,
  } = useAnimationById(id as string);

  if (isLoading) {
    return (
      <div className="container py-6">
        <Skeleton className="h-8 w-32 mb-4" />
        <div className="grid gap-8 md:grid-cols-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-6">
        <div className="text-center text-destructive">
          Error loading animation: {error?.message}
        </div>
      </div>
    );
  }

  if (!animation) {
    return (
      <div className="container py-6">
        <div className="text-center">Animation not found</div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <Link
        href="/"
        className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to home
      </Link>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-6 overflow-hidden rounded-lg border bg-card">
            <AnimationPlayer
              animationId={id as string}
              animationTitle={animation.title}
              animationCode={animation.code}
            />

            {/* Rest of your JSX with safe animation access */}
            <div className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <h1 className="text-2xl font-bold">{animation.title}</h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={
                          star <=
                          Math.round((animation?.AverageRating ?? 0) / 2)
                            ? "h-4 w-4 fill-yellow-400 text-yellow-400"
                            : "h-4 w-4 text-muted-foreground"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">
                    {(animation.AverageRating ?? 0).toFixed(1)}/10
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({animation.RatingCount ?? 0} ratings)
                  </span>
                </div>
              </div>

              {/* Add null-safe operators for optional fields */}
              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                {/* <span>{(animation.views ?? 0).toLocaleString()} views</span> */}
                {/* <span>•</span> */}
                <span>
                  {animation.createdAt
                    ? new Date(animation.createdAt).toLocaleDateString()
                    : "Unknown date"}
                </span>
              </div>

              <p className="mb-6 text-muted-foreground">
                {animation.description ?? "No description available"}
              </p>

              {/* Rest of your component */}
            </div>
          </div>
          <CommentSection animationId={id as string} />
        </div>

        <div>
          <div className="mb-6 rounded-lg border bg-card p-4">
            <h3 className="mb-4 text-lg font-medium">About the Creator</h3>
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={"/placeholder.svg"}
                  alt={"Unknown author"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{"Anonymous"}</p>
                <p className="text-sm text-muted-foreground">Content Creator</p>
              </div>
            </div>
          </div>

          <RelatedAnimations currentAnimationId={id as string} />
        </div>
      </div>
    </div>
  );
}
