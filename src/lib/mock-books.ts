import type { Book } from '@/lib/types';

export const mockBooks: Book[] = [
  // English
  {
    id: 'book-1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://picsum.photos/seed/book1/300/400',
    description: `In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since. “Whenever you feel like criticizing any one,” he told me, “just remember that all the people in this world haven’t had the advantages that you’ve had.” He didn’t say any more, but we’ve always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I’m inclined to reserve all judgements, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men. Most of the confidences were unsought—frequently I have feigned sleep, preoccupation, or a hostile levity when I realized by some unmistakable sign that an intimate revelation was quivering on the horizon; for the intimate revelations of young men, or at least the terms in which they express them, are usually plagiaristic and marred by obvious suppressions. Reserving judgements is a matter of infinite hope. I am still a little afraid of missing something if I forget that, as my father snobbishly suggested, and I snobbishly repeat, a sense of the fundamental decencies is parcelled out unequally at birth.`,
    category: 'English',
  },
  {
    id: 'book-3',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverUrl: 'https://picsum.photos/seed/book3/300/400',
    description: `The story, told through the eyes of Jean Louise "Scout" Finch, takes place in the fictional town of Maycomb, Alabama, during the three years of the Great Depression. Scout lives with her older brother, Jem, and their widowed father, Atticus, a middle-aged lawyer. The children befriend a boy named Dill who visits Maycomb to stay with his aunt each summer. The three are terrified, yet fascinated, by their reclusive neighbor, Arthur "Boo" Radley. The main plot revolves around Atticus's decision to defend Tom Robinson, a black man who has been falsely accused of raping a young white woman, Mayella Ewell. Despite the town's deep-seated racism and the inevitable guilty verdict, Atticus provides a rigorous defense, earning the respect of the black community and teaching his children a profound lesson in courage and integrity. The novel masterfully explores themes of racial injustice, the destruction of innocence, and the pervasiveness of class and gender roles in the American Deep South.`,
    category: 'English',
  },
  {
    id: 'book-9',
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://picsum.photos/seed/book9/300/400',
    description: `In 1984, London is a grim city in the totalitarian state of Oceania where the Party and its leader, Big Brother, control everything. Winston Smith is a minor party functionary who works at the Ministry of Truth, altering historical records to fit the needs of the Party. Yet he is struggling with his life and has begun to think for himself, which is a crime. Winston has a love affair with a woman named Julia, and they begin to question the Party. They are captured and sent to the Ministry of Love to be tortured. Winston is tortured by a man named O'Brien, who tells him that the Party will control him completely. Winston is eventually broken and learns to love Big Brother. The novel is a chilling depiction of a totalitarian society and a powerful warning about the dangers of totalitarianism.`,
    category: 'English',
  },
   {
    id: 'book-2',
    title: 'Dune',
    author: 'Frank Herbert',
    coverUrl: 'https://picsum.photos/seed/book2/300/400',
    description: `Set in the distant future amidst a feudal interstellar empire where noble houses, in control of individual planets, owe allegiance to the Padishah Emperor, Dune tells the story of young Paul Atreides, whose family accepts the stewardship of the desert planet Arrakis. As the only source of the "spice" melange, the most important and valuable substance in the universe, control of Arrakis is a coveted and dangerous undertaking. The story explores the multi-layered interactions of politics, religion, ecology, technology, and human emotion, as the forces of the empire confront each other in a struggle for control of Arrakis and its spice.`,
    category: 'English',
  },
  // History
  {
    id: 'book-4',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    coverUrl: 'https://picsum.photos/seed/book4/300/400',
    description: `One hundred thousand years ago, at least six different species of humans inhabited Earth. Yet today there is only one—homo sapiens. What happened to the others? And what may happen to us? Most books about the history of humanity pursue either a historical or a biological approach, but Dr. Yuval Noah Harari breaks the mold with this highly original book that begins about 70,000 years ago with the appearance of modern cognition. From examining the role evolving humans have played in the global ecosystem to charting the rise of empires, Sapiens integrates history and science to reconsider accepted narratives, connect past developments with contemporary concerns, and examine specific events within the context of larger ideas.`,
    category: 'History',
  },
  {
    id: 'book-11',
    title: 'Guns, Germs, and Steel',
    author: 'Jared Diamond',
    coverUrl: 'https://picsum.photos/seed/book11/300/400',
    description: `In this "artful, informative, and delightful" (William H. McNeill, New York Review of Books) book, Jared Diamond convincingly argues that geographical and environmental factors shaped the modern world. Societies that had a head start in food production advanced beyond the hunter-gatherer stage, and then developed writing, technology, government, and organized religion—as well as nasty germs and potent weapons of war. The book traverses the globe, from the Fertile Crescent to the Americas, exploring why Eurasian civilizations, in particular, have survived and conquered others, despite being no more intelligent than people elsewhere. It is a work of monumental scope, a major advance in our understanding of human societies.`,
    category: 'History',
  },
  // Physics
  {
    id: 'book-6',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    coverUrl: 'https://picsum.photos/seed/book6/300/400',
    description: `Stephen Hawking, one of the most brilliant theoretical physicists in history, wrote A Brief History of Time to help non-scientists understand the questions being asked by scientists today: Where did the universe come from? How and why did it begin? Will it come to an end, and if so, how? In this book, Hawking attempts to explain a range of subjects in cosmology, including the Big Bang, black holes, and light cones, in simple terms. His main goal is to give an overview of the subject, but he also attempts to explain some complex mathematics. The book is a fascinating exploration of the cosmos, from the smallest particles to the largest galaxies, and offers a glimpse into the mind of one of the world's greatest thinkers.`,
    category: 'Physics',
  },
  {
    id: 'book-12',
    title: 'The Elegant Universe',
    author: 'Brian Greene',
    coverUrl: 'https://picsum.photos/seed/book12/300/400',
    description: `Brian Greene, one of the world's leading string theorists, peels away layers of mystery to reveal a universe that consists of eleven dimensions, where the fabric of space tears and repairs itself, and all matter is generated by the vibrations of microscopically tiny loops of energy. The Elegant Universe makes some of the most sophisticated concepts in physics accessible and entertaining, bringing us closer than ever to understanding how the universe works. The book is a journey into the heart of modern physics, exploring the quest for the ultimate theory of everything.`,
    category: 'Physics',
  },
  // Science
  {
    id: 'book-8',
    title: 'Cosmos',
    author: 'Carl Sagan',
    coverUrl: 'https://picsum.photos/seed/book8/300/400',
    description: `Cosmos is one of the bestselling science books of all time. In clear-eyed, accessible prose, Sagan reveals a jewel-like blue world inhabited by a life form that is just beginning to discover its own identity and to venture into the vast ocean of space. Featuring a new Foreword by Ann Druyan and an Introduction by Neil deGrasse Tyson, Cosmos retraces the fourteen billion years of cosmic evolution that have transformed matter into consciousness, exploring such topics as the origin of life, the human brain, Egyptian hieroglyphics, spacecraft missions, the death of the Sun, the evolution of galaxies, and the forces and individuals who helped to shape modern science.`,
    category: 'Science',
  },
  // Biology
  {
    id: 'book-13',
    title: 'The Selfish Gene',
    author: 'Richard Dawkins',
    coverUrl: 'https://picsum.photos/seed/book13/300/400',
    description: `Inheriting the mantle of revolutionary biologist from Darwin, Watson, and Crick, Richard Dawkins forced an enormous change in the way we see ourselves and the world with the publication of The Selfish Gene. It was a glimpse into a new world of evolution, a world seen through the eyes of our genes. The book explains how all living things, from the smallest virus to the largest whale, are essentially survival machines for their genes. It is a landmark work in the field of evolutionary biology, and its ideas are as relevant today as they were when it was first published.`,
    category: 'Biology',
  },
  // Chemistry
  {
    id: 'book-14',
    title: 'The Disappearing Spoon',
    author: 'Sam Kean',
    coverUrl: 'https://picsum.photos/seed/book14/300/400',
    description: `The Periodic Table is a crowning scientific achievement, but it's also a treasure trove of adventure, betrayal, and obsession. These fascinating tales follow every element on the table as they play out their parts in human history, and in the lives of the (frequently) mad scientists who discovered them. The Disappearing Spoon masterfully fuses science with the classic lore of invention, investigation, and discovery—from the Big Bang through the end of time. You'll learn why Gandhi hated iodine, why the Japanese kill with cadmium, and why tellurium made the most brilliant gold rushers rich.`,
    category: 'Chemistry',
  },
  // Mathematics
  {
    id: 'book-15',
    title: 'Fermat\'s Enigma',
    author: 'Simon Singh',
    coverUrl: 'https://picsum.photos/seed/book15/300/400',
    description: `x^n + y^n = z^n, where n is an integer greater than 2, has no non-zero integer solutions for x, y, and z. This is Fermat's Last Theorem, a problem that puzzled the world's greatest minds for over 350 years. In 1993, after years of secret toil, Cambridge mathematician Andrew Wiles announced a proof. Simon Singh's book is the story of a mathematical quest that began with the ancient Greeks and culminated in Wiles's stunning achievement. It's a story of intrigue, obsession, and the brilliant minds that contributed to solving one of the greatest mathematical mysteries of all time.`,
    category: 'Mathematics',
  },
  // Computer Science
  {
    id: 'book-16',
    title: 'Code: The Hidden Language',
    author: 'Charles Petzold',
    coverUrl: 'https://picsum.photos/seed/book16/300/400',
    description: `What do flashlights, the British invasion, black cats, and seesaws have to do with computers? In CODE, they show us the secret inner life of computers and other smart machines. In what’s surely the most engaging and easiest-to-read book about how computers work, acclaimed author Charles Petzold uses this seemingly simple language to tell a richly illustrated story about the language of computers. He explains how we can use simple concepts like on and off, yes and no, and one and zero to build a modern digital world.`,
    category: 'Computer Science',
  },
  // Art
  {
    id: 'book-17',
    title: 'The Story of Art',
    author: 'E.H. Gombrich',
    coverUrl: 'https://picsum.photos/seed/book17/300/400',
    description: `For over 60 years, The Story of Art has been a global bestseller. Attracting readers of all ages and backgrounds, it is the most popular introduction to art history ever written. Professor Gombrich's voice is clear, and his passion for his subject is infectious. He tells the story of art as a continuous, unfolding narrative, from the earliest cave paintings to the experimental art of today. He makes you feel that you are on a journey of discovery, and that you are learning not just about art, but about the history of the world itself.`,
    category: 'Art',
  },
  // Music
  {
    id: 'book-18',
    title: 'Musicophilia',
    author: 'Oliver Sacks',
    coverUrl: 'https://picsum.photos/seed/book18/300/400',
    description: `Oliver Sacks’s compassionate, eloquent explorations of the human mind have been praised for their insight and wisdom. In Musicophilia, he examines the power of music through the individual experiences of patients, musicians, and everyday people. From a man who is struck by lightning and suddenly becomes a pianist, to a group of children with Williams syndrome who are hypermusical, Sacks explores the place music occupies in the brain and how it affects our lives. This book is a testament to the profound and mysterious relationship between music and the human spirit.`,
    category: 'Music',
  },
  // Geography
  {
    id: 'book-19',
    title: 'Prisoners of Geography',
    author: 'Tim Marshall',
    coverUrl: 'https://picsum.photos/seed/book19/300/400',
    description: `All leaders of nations are constrained by geography. Their choices are limited by mountains, rivers, seas, and concrete. To understand world events, you need to understand geography. In this book, Tim Marshall, an expert in foreign affairs, uses maps, essays, and occasionally the personal experiences of his twenty-five years of reporting to explain how the physical characteristics of countries affect their strength and vulnerabilities and the decisions made by their leaders. He provides a fresh and insightful perspective on the geopolitical strategies of world powers.`,
    category: 'Geography',
  },
];
