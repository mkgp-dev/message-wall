import { Request, Response, Router } from 'express';
import { nanoid } from 'nanoid';
const messageRouter = Router();

type Message = {
    id: string;
    text: string;
    user: string;
    createdAt: Date;
}

const messages: Message[] = [
    {
        id: nanoid(),
        text: "Hi there!",
        user: "Amando",
        createdAt: new Date(),
    },
    {
        id: nanoid(),
        text: "Hello World!",
        user: "Charles",
        createdAt: new Date(),
    },
    {
        id: nanoid(),
        text: "Well it works! a simple Mini Message Board built with Node.js in TypeScript, Express.js, TailwindCSS, and DaisyUI.",
        user: "mkgp-dev",
        createdAt: new Date(),
    },
    {
        id: nanoid(),
        text: "Special mention for Heroicons!",
        user: "mkgp-dev",
        createdAt: new Date(),
    },
];

messageRouter.get("/", (_req: Request, res: Response) => {
    res.render("index", { messages });
});

messageRouter.get("/new", (_req: Request, res: Response) => {
    res.render("form");
});

messageRouter.post("/new", (req: Request, res: Response) => {
    const { messageUser, messageText } = req.body as {
        messageUser: string;
        messageText: string;
    };

    if (!messageUser || !messageText) return res.redirect("/new")

    messages.push({
        id: nanoid(),
        text: messageText.trim(),
        user: messageUser.trim(),
        createdAt: new Date(),
    });

    res.redirect("/");
});

messageRouter.get("/message/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const message = messages.find((item: Message) => item.id === id);

    if (!message) return res.status(404).send("Message not found");

    res.render("message", { id, message });
});

export default messageRouter;