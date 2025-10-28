export type CreateCurriculumRequest = {
    /**
     * Curriculum title displayed to learners.
     */
    title: string;
    modules: Array<{
        /**
         * Module title.
         */
        title: string;
        lessons: Array<{
            /**
             * Lesson title.
             */
            title?: string;
            /**
             * Lesson content, markdown or plain text.
             */
            content?: string;
        }>;
    }>;
    /**
     * Free-form metadata for internal organization or search.
     */
    metadata?: Record<string, any>;
};
