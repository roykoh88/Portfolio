export function Footer({ ownerMode, onOwnerToggle }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>
        © {year} Roy Koh. All rights reserved.{' '}
        <span id="ownerModeWrap">
          <button
            type="button"
            className="footer-owner-link"
            id="ownerModeToggle"
            onClick={onOwnerToggle}
          >
            {ownerMode ? '편집 모드 종료' : '편집 모드'}
          </button>
        </span>
      </p>
    </footer>
  )
}
