# PentesterLab progress tracker

The homepage renders `_data/pentesterlab.json`, refreshed from the public profile at https://pentesterlab.com/profile/FNU_Pallavi1902.

After merging, the Refresh PentesterLab progress workflow runs daily at 14:17 UTC and can also be run from the Actions tab. It commits the data to main and explicitly requests a GitHub Pages rebuild. This workflow expects the existing Pages source to be Deploy from a branch (main). If Pages is switched to GitHub Actions, its deployment workflow must also run after this refresh.

The workflow needs Actions enabled and permission to write to main. Branch protection may require a different publishing approach. No PentesterLab password is needed. GitHub can disable scheduled workflows in inactive public repositories; re-enable this workflow in Actions if that happens.

If fetching or parsing fails, the workflow fails before writing data; the homepage retains its last successful snapshot and date. Changes to PentesterLab's public HTML may require parser updates.

The public profile reports zero earned badges even though Introduction shows 4/4 completed and the private dashboard reports one badge. The card displays completed Introduction exercises rather than a misleading badge count.

Local checks: `python3 -m unittest discover -s tests`. Fetch current data: `python3 scripts/update_pentesterlab.py`. The PR check also builds the site with GitHub's Jekyll Pages action.
