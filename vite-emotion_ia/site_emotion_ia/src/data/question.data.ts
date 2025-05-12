export type QuestionEntry = {
    question: string;
};

export type QuestionBank = {
    [domaine: string]: QuestionEntry[];
};

export const questions: QuestionBank = {
    "Dev front - React": [
        { question: "Qu'est-ce qu'un hook en React ?" },
        { question: "Comment marche la réactivité ?" },
    ],
    "Dev front - Angular": [
        { question: "Qu'est-ce qu'un composant en Angular ?" },
    ],
    "Dev front - Vue": [
        { question: "Qu'est-ce qu'une directive en Vue ?" },
    ],
    "Dev back - Symfony": [
        { question: "Comment créer une entité en Symfony ?" },
        { question: "Comment créer une migration en Symfony ?" },
    ],
    "Dev back - Node.js": [
        { question: "Comment créer un serveur HTTP en Node.js ?" },
    ],
    "DevOps": [
        { question: "Comment conteneuriser avec Docker ?" },
    ]
};

export const getRandomQuestionByDomaine = (domaine: string): QuestionEntry | null => {
    const questionsByDomaine = questions[domaine];
    if (!questionsByDomaine || questionsByDomaine.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * questionsByDomaine.length);
    return questionsByDomaine[randomIndex];
}