<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the birthday journey in client-side scene state at the index route; this preserves replay transitions without reloads or a backend.
- Isolate the arrow game, cake microphone lifecycle, letter, and particle effects into focused components; cleanup belongs to the scene that owns it.
- Keep pure interaction rules in a browser-safe module with concrete unit tests; collision must be geometric rather than attempt-based.
