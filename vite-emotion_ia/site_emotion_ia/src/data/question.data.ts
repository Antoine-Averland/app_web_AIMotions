export type QuestionEntry = {
    question: string;
};

export type QuestionBank = {
    [domaine: string]: QuestionEntry[];
};

export const questions: QuestionBank = {
    "Questions générales": [
        { question: "Comment réagissez-vous face à un défi imprévu ?" },
        { question: "Quels sont vos objectifs professionnels à long terme ?" },
        { question: "Quelle est la chose la plus difficile que vous avez réalisée jusqu’à maintenant ?" },
        { question: "Que faites-vous pour gérer le stress dans une situation tendue ?" },
        { question: "Comment décririez-vous votre manière de travailler en équipe ?" }
    ],
    "Domaine de l'IA": [
        { question: "Que signifie pour vous \"intelligence artificielle\" ?" },
        { question: "Pourquoi l'IA est-elle importante dans le monde actuel ?" },
        { question: "Comment utiliseriez-vous l'IA pour résoudre un problème concret ?" },
        { question: "Quels sont les risques associés à l'utilisation de l'IA ?" },
        { question: "Quelles sont, selon vous, les limites actuelles de l'IA ?" }
    ],
    "Systèmes embarqués": [
        { question: "Qu'est-ce qu'un système embarqué selon vous ?" },
        { question: "Pourquoi sont-ils cruciaux dans notre vie quotidienne ?" },
        { question: "Donnez un exemple d'application de systèmes embarqués que vous trouvez intéressante." },
        { question: "À votre avis, quelle est l'importance de la fiabilité dans ces systèmes ?" },
        { question: "Quels défis pensez-vous que l’on peut rencontrer dans la conception de ces systèmes ?" }
    ],
    "Médecine": [
        { question: "Pensez-vous que la technologie peut remplacer les médecins à l'avenir ?" },
        { question: "Selon vous, quel rôle joue l’IA dans l’amélioration des soins médicaux ?" },
        { question: "Comment réagiriez-vous si un diagnostic médical dépendait uniquement d'une machine ?" },
        { question: "Quels sont, selon vous, les avantages et les inconvénients de l’automatisation en médecine ?" },
        { question: "Pensez-vous que les données médicales des patients sont suffisamment protégées ?" }
    ],
    "Informatique": [
        { question: "Pourquoi avez-vous choisi d’étudier l’informatique ?" },
        { question: "Selon vous, quel est l’impact de la technologie sur la société ?" },
        { question: "Quels sont les défis majeurs auxquels les professionnels de l'informatique doivent faire face ?" },
        { question: "À votre avis, quelles compétences sont les plus importantes pour un informaticien ?" },
        { question: "Pensez-vous que l'informatique est un domaine qui évolue trop vite ?" }
    ],
    "Réseau et Cybersécurité": [
        { question: "À quoi pensez-vous quand vous entendez le mot \"cybersécurité\" ?" },
        { question: "Selon vous, qu'est-ce qu'une menace numérique ?" },
        { question: "Pensez-vous que les entreprises prennent suffisamment de mesures pour protéger leurs données ?" },
        { question: "Quels sont, à votre avis, les principaux défis pour sécuriser un réseau ?" },
        { question: "Pensez-vous que tout le monde devrait avoir des connaissances de base en cybersécurité ?" }
    ],
    "Motivation et parcours": [
        { question: "Pourquoi avez-vous choisi de poursuivre vos études en école d'ingénieur ?" },
        { question: "Pourquoi souhaitez-vous faire de l'alternance ?" },
        { question: "Comment avez-vous découvert notre entreprise ?" },
        { question: "Qu’est-ce qui vous attire dans ce poste ou ce domaine ?" },
        { question: "Quels sont vos objectifs professionnels à court et long terme ?" }
    ],
    "Compétences techniques": [
        { question: "Quels sont les principaux cours ou projets que vous avez réalisés cette année ? Pouvez-vous nous en parler ?" },
        { question: "Quels langages de programmation maîtrisez-vous ? Lesquels préférez-vous et pourquoi ?" },
        { question: "Avez-vous déjà travaillé sur des projets concrets (personnels ou académiques) ? Si oui, décrivez-en un." },
        { question: "Comment approchez-vous la résolution d’un problème technique complexe ?" },
        { question: "Avez-vous utilisé des outils spécifiques (CAD, logiciels de simulation, etc.) en cours ou pour des projets ?" }
    ],
    "Adaptabilité et organisation": [
        { question: "Comment gérez-vous votre temps entre vos études et d’autres responsabilités ?" },
        { question: "Avez-vous déjà travaillé en équipe sur des projets ? Comment contribuez-vous au bon fonctionnement de l'équipe ?" },
        { question: "Comment réagissez-vous face à un échec ou une difficulté inattendue ?" },
        { question: "Comment vous organisez-vous pour apprendre de nouvelles compétences ou outils rapidement ?" }
    ],
    "Comportement et soft skills": [
        { question: "Décrivez une situation où vous avez dû résoudre un conflit ou un désaccord en équipe." },
        { question: "Donnez un exemple d’un projet ou d’une tâche où vous avez dû faire preuve de créativité." },
        { question: "Comment réagissez-vous face à la pression ou à des délais serrés ?" },
        { question: "Quelle est votre plus grande force ? Et votre plus grande faiblesse ?" }
    ],
    "Poste ou domaine spécifique": [
        { question: "Que savez-vous sur notre entreprise et notre secteur d'activité ?" },
        { question: "Quels sont, selon vous, les défis principaux dans notre domaine ?" },
        { question: "Avez-vous des connaissances ou un intérêt particulier pour [technologie/outil spécifique à l’entreprise] ?" },
        { question: "Comment pensez-vous que cette alternance peut vous aider à développer vos compétences ?" }
    ],
    "Curiosité et implication": [
        { question: "Quels sont vos centres d’intérêt en dehors de vos études ? Avez-vous des activités ou hobbies liés au poste ?" },
        { question: "Suivez-vous des tendances technologiques ou des avancées dans votre domaine ?" },
        { question: "Avez-vous des idées sur comment améliorer un processus ou un produit dans notre entreprise ?" }
    ],
    "Adéquation avec l’alternance": [
        { question: "Êtes-vous prêt à vous engager sur [durée de l'alternance] ?" },
        { question: "Comment envisagez-vous de gérer la charge de travail entre votre formation et vos missions en entreprise ?" },
        { question: "Que pouvez-vous apporter à notre équipe ?" },
        { question: "Qu’attendez-vous de votre tuteur d’alternance ?" }
    ],
};

export const getRandomQuestionByDomaine = (domaine: string): QuestionEntry | null => {
    const questionsByDomaine = questions[domaine];
    if (!questionsByDomaine || questionsByDomaine.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * questionsByDomaine.length);
    return questionsByDomaine[randomIndex];
};
