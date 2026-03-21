# Developer Journal

Today we tested four editors with the same document and looked at:

1. Toolbar discoverability
2. Paste-from-Word cleanup
3. Keyboard shortcuts
4. Raw markdown round-tripping

Observations:

- Editor A had the best table editing UX.
- Editor B rendered quickly but rewrote list indentation aggressively.
- Editor C had great plugin options but heavier startup cost.
- Editor D was easiest to integrate into Blazor interop.

Next step is to score each editor with weighted criteria.
