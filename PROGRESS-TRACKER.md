# PentesterLab progress tracker

The homepage renders `_data/pentesterlab.json`, refreshed from the public profile at https://pentesterlab.com/profile/FNU_Pallavi1902.

After merging, the Refresh PentesterLab progress workflow runs daily at 14:17 UTC and can also be run from the Actions tab. It commits the data to main and explicitly requests a GitHub Pages rebuild. This workflow expects the existing Pages source to be Deploy from a branch (main). If Pages is switched to GitHub Actions, its deployment workflow must also run after this refresh.

The workflow needs Actions enabled and permission to write to main. Branch protection may require a different publishing approach. No PentesterLab password is needed. GitHub can disable scheduled workflows in inactive public repositories; re-enable this workflow in Actions if that happens.

If fetching or parsing fails, the workflow fails before writing data; the homepage retains its last successful snapshot and date. Changes to PentesterLab's public HTML may require parser updates.

The public profile reports zero earned badges even though Introduction shows 4/4 completed and the private dashboard reports one badge. The card displays completed Introduction exercises rather than a misleading badge count.

Local checks: `python3 -m unittest discover -s tests`. Fetch current data: `python3 scripts/update_pentesterlab.py`. The PR check also builds the site with GitHub's Jekyll Pages action.

## Learning tracks and badges

`badges` contains counts linked to `/badges/`; `learning_tracks` contains counts linked to `/tracks/`. Badge names are never mapped to language-track names. The public profile fetched on October 8, 2026 has no track counts. The public track catalogue lists Junior Pentester with 62 exercises and does not expose this user's completion. Neither catalogue totals nor recent activity establish dashboard track progress.

The separate `pentesterlab-track-snapshots.json` records the user's reported Junior Pentester 9/121, 7% snapshot, with an explicit source label in the UI. It is NOT automatically verified, and the profile synchronization date does not date this snapshot. A future public profile track row supersedes the snapshot automatically. Python, JavaScript and other actual tracks appear under Learning Tracks when the public profile exposes nonzero counts; no zero completion is assumed for unavailable data. All nonzero badges appear under Badges. Percentages derived from counts use floor, matching 9/121 = 7%.

Automatic refresh of dashboard-only tracks needs a public share source or a supported authenticated source; the existing public-only workflow cannot obtain private progress. Failed or invalid profile parsing leaves all prior output untouched. Parser tests include the fetched public HTML as well as synthetic track rows (the latter are compatibility tests, not observed public markup).
