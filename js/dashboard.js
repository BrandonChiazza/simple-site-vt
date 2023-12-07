async function getToken(dashboardId) {
    let login_data = {
        username: "admin",
        password: "Bhav1998@",
        provider: "db",
        refresh: true,
    };
    let token_data = {
        resources: [
            { id: dashboardId, type: "dashboard" },
        ],
        rls: [],
        user: { first_name: "Guest", last_name: "User", username: "guest" },
    };

    const login_option = {
        method: "POST",
        body: JSON.stringify(login_data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "application/json",
        },
    };

    var token = await fetch(
        "//analytics.ignatius.io/api/v1/security/login",
        login_option
    )
    .then(async (loginData) => {
        const token_option = {
            method: "POST",
            body: JSON.stringify(token_data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Accept: "application/json",
                Authorization: "Bearer " + (await loginData.json()).access_token,
            },
        };

        return fetch(
            "//analytics.ignatius.io/api/v1/security/guest_token/",
            token_option
        )
        .then(async (response) => {
            if (!response.ok) throw new Error('Response not OK');
            return (await response.json()).token;
        });
    })
    .catch((error) => {
        console.error("There was an error!", error);
    });

    return token;
}

function initializeDashboard(dashboardContainer) {
    const dashboardId = dashboardContainer.dataset.dashboardId;
    const mountPoint = dashboardContainer.querySelector('.superset-container');

    supersetEmbeddedSdk.embedDashboard({
        id: dashboardId,
        supersetDomain: "https://analytics.ignatius.io",
        mountPoint: mountPoint,
        fetchGuestToken: async () => await getToken(dashboardId),
        dashboardUiConfig: {
            hideTitle: true,
            hideChartControls: true,
            hideTab: true,
        },
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const dashboardContainers = document.querySelectorAll('.dashboard-container');
    dashboardContainers.forEach(container => initializeDashboard(container));
});
document.addEventListener('DOMContentLoaded', function() {
    const dashboardMountPoint = document.getElementById("my-superset-container");
    const dashboardId = dashboardMountPoint.dataset.dashboardId;

    supersetEmbeddedSdk.embedDashboard({
        id: dashboardId,
        supersetDomain: "https://analytics.ignatius.io",
        mountPoint: dashboardMountPoint,
        fetchGuestToken: async () => await getToken(dashboardId),
        dashboardUiConfig: {
            hideTitle: true,
            hideChartControls: true,
            hideTab: true,
        },
    });
});
