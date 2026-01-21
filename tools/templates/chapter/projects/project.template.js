export class ProjectTemplate {
  constructor(options = {}) {
    this.options = options;
  }
  run() {
    return 'ok';
  }
}

// Demo when run directly (optional)
if (import.meta.url === `file://${process.argv[1]}`) {
  const p = new ProjectTemplate();
  console.log(p.run());
}
