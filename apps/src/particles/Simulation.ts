import { pixelsPerFace, faceWidth, faceHeight, facesCount } from "../utils/const";
import { Point2D } from "../maze/Point2D";
import { randomIntRange, randomRange } from "../utils/misc";
import { LedMatrixInstance } from "rpi-led-matrix";
import { Accelerometer } from "../utils/Accelerometer";
import { SpatialHashMap } from "./SpacialHashmap";
import { SideReboundingParticle } from "./SideReboundingParticle";
import { CubeFace } from "../utils/CubeFace";

export class Simulation {
  private particles: SideReboundingParticle[];
  private hashmap: SpatialHashMap;

  constructor(private face: CubeFace, private accel: Accelerometer) {
    this.init();
  }

  init() {
    const numParticles = (pixelsPerFace + pixelsPerFace / 2) / 10;
    this.particles = [];
    this.hashmap = new SpatialHashMap(faceWidth, faceHeight);

    for (let i = 0; i < numParticles; i++)
      this.particles.push(new SideReboundingParticle(
        this.face,
        this.particles,
        new Point2D(randomIntRange(0, faceWidth), randomIntRange(0, faceHeight)),
        new Point2D(randomRange(-0.5, 0.5), randomRange(-0.5, 0.5))
      ));

  }

  update(delta: number) {
    //console.log(this.accel.accel)
    //const accelForce = new Point2D(this.accel.accel[1], -this.accel.accel[2]).multiplyBy(delta / 100);

    //this.hashmap.clear();

    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      //particle.applyForce(accelForce);
      particle.update(delta);
      //this.hashmap.add(particle.position.x, particle.position.y, i);
    }

    // For each cell query then resolve collisions
    // for(let cell of this.hashmap.grid) {
    //   if (cell.length < 2) continue;
    //   for(let particleI of cell) {
    //     const 
    //   }
    // }


    // for (let groupI = 0; groupI < this.hashmap.length; groupI++) {
    //   this.hashmap[groupI].clear();
    //   for (let particle of this.particles[groupI]) {
    //     const query = this.hashmap[groupI].query(particle.position.x, particle.position.y);
    //     if (query.length) {
    //       particle.position = particle.oldPosition;
    //       particle.velocity = particle.velocity.multiplyBy(0.5);
    //     }
    //   }
    // }

  }

  render(matrix: LedMatrixInstance) {
    for (let particle of this.particles) particle.render();
  }
}
