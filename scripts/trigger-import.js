// Trigger import via API to use Next.js environment (handling aliases etc)
async function run() {
    const secretKey = 'cron_secret_test_123';
    // We want to force re-import, but the API is additive.
    // However, for now, let's just trigger it and see if new jobs appear correct.
    // If the user wants to clear old ones, we might need a separate 'clear' endpoint or manual DB access.
    // For this debugging session, triggering it is safest.

    // NOTE: The previous script failed because of ESM/Alias issues in standalone node.
    // Hitting the running server is the robust way.

    const url = `http://127.0.0.1:3000/api/cron/import-jobs?key=${secretKey}&limit=50`;

    console.log(`Triggering job import via API: ${url}`);

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log('Response status:', response.status);
        console.log('Data:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error triggering import:', error.message);
    }
}

run();
