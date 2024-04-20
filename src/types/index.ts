import { z } from "zod";

/** AUTH USERS */
const AuthSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

export type Auth = z.infer<typeof AuthSchema>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>;
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>;
export type ForgotPasswordForm = Pick<Auth, 'email'>;
export type NewPasswordFormType = Pick<Auth, 'password' | 'password_confirmation'>;

export type ConfirmToken = Pick<Auth, 'token'>;

/** Users */
export const userEchema = AuthSchema.pick({
    name: true,
    email: true,
}).extend({
    _id: z.string()
});
export type User = z.infer<typeof userEchema>;

/** NOTES */
export const NoteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userEchema,
    task: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type Note = z.infer<typeof NoteSchema>;
export type NoteFormData = Pick<Note, 'content'>;

/** TASK */
export const TaskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"]);
export type TaskStatus = z.infer<typeof TaskStatusSchema>

export const TaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: TaskStatusSchema,
    completeBy: z.array(z.object({
        _id: z.string(),
        user: userEchema,
        status: TaskStatusSchema
    })),
    notes: z.array(NoteSchema.extend({
        createdBy: userEchema
    })),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>; 

/** Projects */
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(userEchema.pick({ _id: true })),
});

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true,
    })
);

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, 'clientName' | 'description' | 'projectName'>;

/** TEAM */
const TeamMemberSchema = userEchema.pick({
    name: true,
    email: true,
    _id: true,
})

export const teamMembersSchema = z.array(TeamMemberSchema);
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;