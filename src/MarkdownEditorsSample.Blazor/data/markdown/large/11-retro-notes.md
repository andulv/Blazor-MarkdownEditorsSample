# Retro Notes

## What Went Well

- Integration wrappers stayed isolated per editor.
- Shared browser reduced duplicate code.
- Test pages made subjective comparisons easier.

## What Was Hard

- CSS collisions between editor themes.
- Different markdown serializers producing tiny output diffs.
- Handling script load order in a Blazor app shell.

## Actions

1. Keep wrappers thin and focused.
2. Prefer explicit version pinning of CDN assets.
3. Maintain representative content fixtures.
4. Document known behavior differences.

## Extra Narrative

This paragraph exists mostly as realistic filler. It is written to be long enough for scroll behavior testing and to catch odd cursor jumps, selection drift, and toolbar positioning issues in editors that do complex DOM transforms behind the scenes.
