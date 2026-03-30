import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import {
  MAX_IMAGE_BYTES,
  defaultProjectByCodeUrl,
  defaultProjectByTitle,
} from '../lib/projects/constants'
import { projectKey } from '../lib/projects/projectStorage'

const CAROUSEL_MOBILE_BREAKPOINT = 768

function projectCardCopy(p, lang, t) {
  const def =
    defaultProjectByTitle(p.title) ||
    (p.titleEn ? defaultProjectByTitle(String(p.titleEn).trim()) : undefined)
  const titleEn = p.titleEn ?? def?.titleEn
  const descEn = p.descriptionEn ?? def?.descriptionEn
  if (lang !== 'en') {
    return {
      title: p.title || t('projects.noTitle'),
      description: p.description || '',
    }
  }
  return {
    title:
      (titleEn && String(titleEn).trim()) ||
      p.title ||
      t('projects.noTitle'),
    description:
      descEn !== undefined && descEn !== null
        ? String(descEn)
        : p.description || '',
  }
}

function parseTags(tags) {
  return (tags || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
}

function institutionLine(p, lang) {
  const def =
    defaultProjectByTitle(p.title) ||
    (p.titleEn ? defaultProjectByTitle(String(p.titleEn).trim()) : undefined) ||
    defaultProjectByCodeUrl(p.codeUrl)
  const ko = String(p.institution ?? def?.institution ?? '').trim()
  const en = String(p.institutionEn ?? def?.institutionEn ?? '').trim()
  if (lang === 'en') return en || ko
  return ko || en
}

export function Projects({ orderedProjects, addProject, removeProject }) {
  const { lang, t } = useLanguage()
  const [modalOpen, setModalOpen] = useState(false)
  const [carouselScroll, setCarouselScroll] = useState(false)
  const [projectFilter, setProjectFilter] = useState('all')
  const scrollRef = useRef(null)
  const formRef = useRef(null)

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'all') return orderedProjects
    return orderedProjects.filter((p) => {
      const ty = p.projectType || 'personal'
      if (projectFilter === 'personal') return ty === 'personal'
      if (projectFilter === 'academy') return ty === 'academy'
      return ty === 'outsourced'
    })
  }, [orderedProjects, projectFilter])

  const projectCount = filteredProjects.length

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
        window.alert(t('projects.alertImageSize'))
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
          <h2 className="section-title">{t('nav.projects')}</h2>
          <button
            type="button"
            className="btn btn-add owner-only"
            id="projectAddBtn"
            onClick={() => setModalOpen(true)}
          >
            {t('projects.add')}
          </button>
        </div>
        <p className="section-desc">
          {t('projects.desc')}
          <span className="owner-only"> </span>
        </p>
        <div
          className="project-filter"
          role="group"
          aria-label={t('projects.filterAria')}
        >
          {(['all', 'personal', 'academy', 'outsourced']).map((key) => {
            const labelKey =
              key === 'all'
                ? 'filterAll'
                : key === 'personal'
                  ? 'filterPersonal'
                  : key === 'academy'
                    ? 'filterAcademy'
                    : 'filterOutsourced'
            return (
              <button
                key={key}
                type="button"
                className={`project-filter-btn${
                  projectFilter === key ? ' is-active' : ''
                }`}
                onClick={() => setProjectFilter(key)}
              >
                {t(`projects.${labelKey}`)}
              </button>
            )
          })}
        </div>
        {filteredProjects.length === 0 && orderedProjects.length > 0 ? (
          <p className="project-filter-empty">{t('projects.filterEmpty')}</p>
        ) : null}
        <div
          className={`project-carousel project-carousel--${
            carouselScroll ? 'scroll' : 'fill'
          }`}
        >
          <button
            type="button"
            className="carousel-btn carousel-prev"
            aria-label={t('projects.prevAria')}
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
              {filteredProjects.map((p) => {
                const type = p.projectType || 'personal'
                const typeLabel =
                  type === 'academy'
                    ? t('projects.academy')
                    : type === 'outsourced'
                      ? t('projects.outsourced')
                      : t('projects.personal')
                const typeClass =
                  type === 'academy'
                    ? 'project-badge project-badge--academy'
                    : type === 'outsourced'
                      ? 'project-badge project-badge--outsourced'
                      : 'project-badge project-badge--personal'
                const tags = parseTags(p.tags)
                const { title: cardTitle, description: cardDesc } =
                  projectCardCopy(p, lang, t)
                const org =
                  type === 'academy' || type === 'outsourced'
                    ? institutionLine(p, lang)
                    : ''
                return (
                  <article
                    className="project-card"
                    key={projectKey(p)}
                  >
                    <div className="project-image">
                      {p.image ? (
                        <img src={p.image} alt={cardTitle} />
                      ) : (
                        <div className="project-placeholder">📁</div>
                      )}
                      <button
                        type="button"
                        className="project-delete owner-only"
                        aria-label={t('projects.deleteAria')}
                        onClick={() => removeProject(p)}
                      >
                        ×
                      </button>
                    </div>
                    <div className="project-body">
                      <div className={typeClass}>{typeLabel}</div>
                      <h3 className="project-title">{cardTitle}</h3>
                      {org ? (
                        <p className="project-institution">{org}</p>
                      ) : null}
                      <p className="project-desc">{cardDesc}</p>
                      <div className="project-tags">
                        {tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <div className="project-links">
                        {p.demoUrl ? (
                          <a
                            href={p.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t('projects.demo')}
                          </a>
                        ) : null}
                        {p.codeUrl ? (
                          <a
                            href={p.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t('projects.code')}
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
            aria-label={t('projects.nextAria')}
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
          {t('projects.empty')}
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
            <h3 className="modal-title">{t('projects.modalTitle')}</h3>
            <button
              type="button"
              className="modal-close modal-close-prominent"
              aria-label={t('projects.closeAria')}
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
              {t('projects.labelTitle')}{' '}
              <span className="required">{t('projects.required')}</span>
            </label>
            <input
              type="text"
              name="title"
              className="form-input"
              required
              placeholder={t('projects.phTitle')}
            />
            <label className="form-label">{t('projects.labelDesc')}</label>
            <textarea
              name="description"
              className="form-input form-textarea"
              rows={3}
              placeholder={t('projects.phDesc')}
            />
            <label className="form-label">
              {t('projects.labelTags')}{' '}
              <span className="form-hint">{t('projects.hintTags')}</span>
            </label>
            <input
              type="text"
              name="tags"
              className="form-input"
              placeholder="React, API, Node.js"
            />
            <label className="form-label">{t('projects.labelDemo')}</label>
            <input
              type="url"
              name="demoUrl"
              className="form-input"
              placeholder={t('projects.phDemo')}
            />
            <label className="form-label">{t('projects.labelCode')}</label>
            <input
              type="url"
              name="codeUrl"
              className="form-input"
              placeholder={t('projects.phCode')}
            />
            <label className="form-label">
              {t('projects.labelImage')}{' '}
              <span className="form-hint">{t('projects.hintImage')}</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              className="form-input"
              placeholder={t('projects.phImageUrl')}
              id="projectImageUrl"
            />
            <input
              type="file"
              name="imageFile"
              className="form-input form-file"
              accept="image/*"
              id="projectImageFile"
              aria-label={t('projects.imageFileAria')}
            />
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-ghost"
                id="projectFormCancel"
                onClick={closeModal}
              >
                {t('projects.cancel')}
              </button>
              <button type="submit" className="btn btn-primary">
                {t('projects.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
