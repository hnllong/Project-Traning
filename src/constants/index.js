// export const apiKey = 'place your openAI api key here';
// in some cases your api key maybe already expired
// try to use a new account to create an api key
export const apiKey = '595cb3e8f1c1fd4a906b921f0dc66013';

export const moviesData = [
  {
    id: 2,
    title: 'Ant-Man and the Wasp: Quantumania',
    backgroundPoster:
      'https://image.tmdb.org/t/p/w500/9Hk9qdCyce04VXNQuDXAK1d138E.jpg',
    image: 'https://image.tmdb.org/t/p/w500/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg',
    description:
      "Super-Hero partners Scott Lang and Hope van Dyne, along with with Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter Cassie Lang, find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that will push them beyond the limits of what they thought possible.",
    releaseDate: '1991-01-18',
    releaseYear: '2020',
    runTime: '170',
  },
];

export const personData = {
  name: 'Keanu Reeves',
  birthPlace: 'Beirut, Lebanon',
  birthday: '1964-09-02',
  gender: 'Male',
  knownFor: 'acting',
  popularity: '74.34',
  biography:
    "Keanu Charles Reeves is a Canadian actor. Reeves is known for his roles in Bill & Ted's Excellent Adventure, Speed, Point Break, and The Matrix franchise as Neo. He has collaborated with major directors such as Stephen Frears (in the 1988 period drama Dangerous Liaisons); Gus Van Sant (in the 1991 independent film My Own Private Idaho); and Bernardo Bertolucci (in the 1993 film Little Buddha). Referring to his 1991 film releases, The New York Times' critic, Janet Maslin, praised Reeves' versatility, saying that he \"displays considerable discipline and range. He moves easily between the buttoned-down demeanor that suits a police procedural story and the loose-jointed manner of his comic roles.\" A repeated theme in roles he has portrayed is that of saving the world, including the characters of Ted Logan, Buddha, Neo, Johnny Mnemonic, John Constantine and Klaatu.",
};

export const dummyMessages = [
  {
    role: 'user',
    content: 'How are you?',
  },
  {
    role: 'assistant',
    content: "I'm fine, How may i help you today.",
  },
  {
    role: 'user',
    content: 'create an image of a dog playing with cat',
  },
  {
    role: 'assistant',
    content:
      'https://storage.googleapis.com/pai-images/ae74b3002bfe4b538493ca7aedb6a300.jpeg',
  },
];
