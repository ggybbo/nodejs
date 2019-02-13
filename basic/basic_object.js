var version = 1;

const person = {
  name: 'ggybbo',
  hello() {
    console.log(`Hi my name is ${this.name}`);
    console.log(this === person);
  },
  hi: () => {
    console.log(`Hi my name is ${this.name}`);
    console.log(this === person);
  }
}

// person.hello();
person.hi();
