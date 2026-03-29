import { useCallback, useEffect, useRef, useState } from 'react'
import { MAX_IMAGE_BYTES } from '../lib/projects/constants'
import { projectKey } from '../lib/projects/projectStorage'

const CAROUSEL_MOBILE_BREAKPOINT = 768

function parseTags(tags) {
  return (tags || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
}

export function Projects({ orderedProjects, addProject, removeProject }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [carouselScroll, setCarouselScroll] = useState(false)
  const scrollRef = useRef(null)
  const formRef = useRef(null)

  const projectCount = orderedProjects.length

  useEffect(() => {
    function update() {
      const isMobile = window.innerWidth <= CAROUSEL_MOBILE_BREAKPOINT
      const useScroll = projectCount > 5 || (isMobile && projectCount >= 2)
      setCarouselScroll(useScroll)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [projectCount])

  const getScrollStep = useCallback(() => {
    const el = scrollRef.current
    if (!el) return 320
    const first = el.querySelector('.project-card')
    if (!first) return 320
    const gap = parseInt(getComputedStyle(el).gap, 10) || 24
    return first.offsetWidth + gap
  }, [])

  const onCarouselPrev = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const atStart = el.scrollLeft <= 2
    if (atStart) {
      el.scrollTo({ left: el.scrollWidth - el.clientWidth, behavior: 'smooth' })
    } else {
      el.scrollBy({ left: -getScrollStep(), behavior: 'smooth' })
    }
  }, [getScrollStep])

  const onCarouselNext = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const atEnd = max <= 0 || el.scrollLeft >= max - 2
    if (atEnd) {
      el.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      el.scrollBy({ left: getScrollStep(), behavior: 'smooth' })
    }
  }, [getScrollStep])

  function closeModal() {
    setModalOpen(false)
    formRef.current?.reset()
  }

  function onSubmit(e) {
    e.preventDefault()
    const form = formRef.current
    if (!form) return
    const fd = new FormData(form)
    const title = (fd.get('title') || '').toString().trim()
    const description = (fd.get('description') || '').toString().trim()
    const tags = (fd.get('tags') || '').toString().trim()
    const demoUrl = (fd.get('demoUrl') || '').toString().trim()
    const codeUrl = (fd.get('codeUrl') || '').toString().trim()
    const imageUrl = (fd.get('imageUrl') || '').toString().trim()
    const imageFile = form.querySelector('input[name="imageFile"]')?.files?.[0]

    if (!title) return

    function finish(image) {
      addProject({
        title,
        description,
        tags,
        demoUrl: demoUrl || '',
        codeUrl: codeUrl || '',
        image: image || '',
        projectType: 'personal',
      })
      closeModal()
    }

    if (imageUrl) {
      finish(imageUrl)
      return
    }
    if (imageFile) {
      if (imageFile.size > MAX_IMAGE_BYTES) {
        window.alert('이미지는 400KB 이하로 올려주세요.')
        return
      }
      const reader = new FileReader()
      reader.onload = () => finish(reader.result)
      reader.readAsDataURL(imageFile)
      return
    }
    finish('')
  }

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-title-row">
          <h2 className="section-title">Projects</h2>
          <button
            type="button"
            className="btn btn-add owner-only"
            id="projectAddBtn"
            onClick={() => setModalOpen(true)}
          >
            + Add Project
          </button>
        </div>
        <p className="section-desc">
          그동안 개발한 프로젝트입니다.
          <span className="owner-only"> </span>
        </p>
        <div
          className={`project-carousel project-carousel--${
            carouselScroll ? 'scroll' : 'fill'
          }`}
        >
          <button
            type="button"
            className="carousel-btn carousel-prev"
            aria-label="이전 프로젝트"
            onClick={onCarouselPrev}
          >
            ‹
          </button>
          <div
            className="project-carousel-scroll"
            ref={scrollRef}
            id="projectCarouselScroll"
          >
            <div className="project-grid" id="projectGrid">
              {orderedProjects.map((p) => {
                const type = p.projectType || 'personal'
                const typeLabel =
                  type === 'academy' ? '학원 프로젝트' : '개인 프로젝트'
                const typeClass =
                  type === 'academy'
                    ? 'project-badge project-badge--academy'
                    : 'project-badge project-badge--personal'
                const tags = parseTags(p.tags)
                return (
                  <article
                    className="project-card"
                    key={projectKey(p)}
                  >
                    <div className="project-image">
                      {p.image ? (
                        <img src={p.image} alt="" />
                      ) : (
                        <div className="project-placeholder">📁</div>
                      )}
                      <button
                        type="button"
                        className="project-delete owner-only"
                        aria-label="삭제"
                        onClick={() => removeProject(p)}
                      >
                        ×
                      </button>
                    </div>
                    <div className="project-body">
                      <div className={typeClass}>{typeLabel}</div>
                      <h3 className="project-title">
                        {p.title || '제목 없음'}
                      </h3>
                      <p className="project-desc">{p.description || ''}</p>
                      <div className="project-tags">
                        {tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                      <div className="project-links">
                        {p.demoUrl ? (
                          <a
                            href={p.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            보기
                          </a>
                        ) : null}
                        {p.codeUrl ? (
                          <a
                            href={p.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            코드
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
          <button
            type="button"
            className="carousel-btn carousel-next"
            aria-label="다음 프로젝트"
            onClick={onCarouselNext}
          >
            ›
          </button>
        </div>
        <p
          className={`project-empty owner-only${
            orderedProjects.length ? ' hidden-when-has-projects' : ''
          }`}
          id="projectEmpty"
        >
          등록된 프로젝트가 없습니다. &quot;프로젝트 추가&quot;로 첫 프로젝트를
          올려보세요.
        </p>
      </div>

      <div
        className={`modal${modalOpen ? ' is-open' : ''}`}
        aria-hidden={modalOpen ? 'false' : 'true'}
        id="projectModal"
      >
        <div
          className="modal-backdrop"
          id="projectModalBackdrop"
          role="presentation"
          onClick={closeModal}
        />
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Add Project</h3>
            <button
              type="button"
              className="modal-close modal-close-prominent"
              aria-label="닫기"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
          <form
            ref={formRef}
            id="projectForm"
            className="project-form"
            onSubmit={onSubmit}
          >
            <label className="form-label">
              제목 <span className="required">*</span>
            </label>
            <input
              type="text"
              name="title"
              className="form-input"
              required
              placeholder="프로젝트 제목"
            />
            <label className="form-label">설명</label>
            <textarea
              name="description"
              className="form-input form-textarea"
              rows={3}
              placeholder="프로젝트 설명을 적어주세요."
            />
            <label className="form-label">
              기술 태그{' '}
              <span className="form-hint">쉼표로 구분 (예: React, TypeScript)</span>
            </label>
            <input
              type="text"
              name="tags"
              className="form-input"
              placeholder="React, API, Node.js"
            />
            <label className="form-label">보기 링크</label>
            <input
              type="url"
              name="demoUrl"
              className="form-input"
              placeholder="https://..."
            />
            <label className="form-label">코드 링크</label>
            <input
              type="url"
              name="codeUrl"
              className="form-input"
              placeholder="https://github.com/..."
            />
            <label className="form-label">
              이미지 <span className="form-hint">URL 또는 파일 선택</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              className="form-input"
              placeholder="이미지 URL"
              id="projectImageUrl"
            />
            <input
              type="file"
              name="imageFile"
              className="form-input form-file"
              accept="image/*"
              id="projectImageFile"
              aria-label="이미지 파일 선택"
            />
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-ghost"
                id="projectFormCancel"
                onClick={closeModal}
              >
                취소
              </button>
              <button type="submit" className="btn btn-primary">
                추가하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
