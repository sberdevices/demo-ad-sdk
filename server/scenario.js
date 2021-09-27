
const express = require('express');
const { v4 } = require('uuid');

const { createSaluteRequest, createSaluteResponse, createScenarioWalker, createSystemScenario } = require('@salutejs/scenario');
const { SaluteMemoryStorage } = require('@salutejs/storage-adapter-memory');

const app = express();

app.use(express.json());

const scenarioWalker = createScenarioWalker({
    systemScenario: createSystemScenario({
        RUN_APP: ({ res, req }) => {

            console.log(JSON.stringify(req.request, null, 2));

            res.setPronounceText('начнем');

            const { payload } = req.request;

            const userData = {
                projectName: payload.projectName,
                device: payload.device,
                app_info: payload.app_info,
            };

            res.appendCommand({
                type: 'sub',
                payload: {
                    sub: req.request.uuid.sub,
                    ...userData
                }
            })

        }
    })
});

const storage = new SaluteMemoryStorage();

app.post('/hook', async ({ body }, response) => {
    // console.log(JSON.stringify(body, null, 2));
    const req = createSaluteRequest(body);
    const res = createSaluteResponse(body);

    const sessionId = body.uuid.userId || v4();
    const session = await storage.resolve(sessionId);

    await scenarioWalker({ req, res, session });
    await storage.save({ id: sessionId, session });

    response.status(200).json(res.message);
});

try {
    app.listen(process.env.PORT, () => {
        console.log(`Listening on ${process.env.PORT}`);
    });
} catch (error) {
    console.error(error);
}

