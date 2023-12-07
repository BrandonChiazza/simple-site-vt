// Ensure the DOM is fully loaded before initializing the dashboard
document.addEventListener('DOMContentLoaded', function() {
    // The element where the dashboard will be mounted
    const dashboardMountPoint = document.getElementById("my-superset-container");

    // Ensure the element and the SDK are available
    if (dashboardMountPoint && typeof supersetEmbeddedSdk !== 'undefined') {
        supersetEmbeddedSdk.embedDashboard({
            id: dashboardMountPoint.dataset.dashboardId, // Assumes your HTML has <div id="my-superset-container" data-dashboard-id="YOUR_DASHBOARD_ID"></div>
            supersetDomain: "https://analytics.ignatius.io",
            mountPoint: dashboardMountPoint,
            fetchGuestToken: getToken, // This assumes 'getToken' is a global function made available by the SDK or another included script
            dashboardUiConfig: {
                hideTitle: true,
                hideChartControls: true,
                hideTab: true,
            },
        });
    } else {
        console.error('Superset SDK or dashboard mount point not found.');
    }
});
