'use client';

import { useState } from 'react';
import { Calendar, Clock, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Modal, Button, Input } from '@/components/ui';
import { useAppStore } from '@/store/app-store';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

export function BookingModal() {
  const { activeModal, closeModal, showToast } = useAppStore();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isOpen = activeModal === 'booking';

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);

  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0 || date.getDay() === 6;
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !name || !email || !phone) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    showToast('Meeting scheduled successfully!', 'success');

    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setSelectedDate(null);
    setSelectedTime('');
    setName('');
    setEmail('');
    setPhone('');
    setIsSuccess(false);
    closeModal();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Book a Call" size="lg">
      {isSuccess ? (
        <div className="py-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-[var(--success)]/20 rounded-full flex items-center justify-center">
            <Check className="text-[var(--success)]" size={40} />
          </div>
          <h3 className="text-2xl font-[var(--font-heading)] text-[var(--text-primary)] mb-3">
            Meeting Scheduled
          </h3>
          <p className="text-[var(--text-secondary)] mb-4">
            We&apos;ve sent a confirmation to {email}
          </p>
          <div className="inline-block p-4 bg-[var(--surface-elevated)] rounded-[var(--radius)] text-left">
            <p className="text-sm text-[var(--text-muted)]">
              {selectedDate && formatDate(selectedDate)} at {selectedTime}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calendar */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-2 hover:bg-[var(--surface-elevated)] rounded-lg transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="font-medium text-[var(--text-primary)]">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-2 hover:bg-[var(--surface-elevated)] rounded-lg transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs text-[var(--text-muted)] py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isDisabled = isDateDisabled(day);
                const isSelected = selectedDate?.getDate() === day && 
                  selectedDate?.getMonth() === currentMonth.getMonth() &&
                  selectedDate?.getFullYear() === currentMonth.getFullYear();

                return (
                  <button
                    key={day}
                    onClick={() => !isDisabled && setSelectedDate(
                      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                    )}
                    disabled={isDisabled}
                    className={`
                      aspect-square flex items-center justify-center rounded-lg text-sm transition-all
                      ${isDisabled 
                        ? 'text-[var(--text-muted)] cursor-not-allowed' 
                        : isSelected
                          ? 'bg-[var(--primary-gold)] text-[var(--background)]'
                          : 'hover:bg-[var(--surface-elevated)] text-[var(--text-primary)]'
                      }
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="mt-6">
                <p className="text-sm font-medium text-[var(--text-secondary)] mb-3">
                  <Clock size={14} className="inline mr-2" />
                  Available Times
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        py-2 px-3 text-xs rounded-lg border transition-all
                        ${selectedTime === time
                          ? 'border-[var(--primary-gold)] bg-[var(--primary-gold)]/10 text-[var(--primary-gold)]'
                          : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]'
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <div className="p-4 bg-[var(--surface-elevated)] rounded-[var(--radius)] border border-[var(--border)]">
              <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                <Calendar size={20} className="text-[var(--primary-gold)]" />
                <div>
                  <p className="text-sm font-medium">
                    {selectedDate ? formatDate(selectedDate) : 'Select a date'}
                  </p>
                  {selectedTime && (
                    <p className="text-xs text-[var(--text-muted)]">{selectedTime}</p>
                  )}
                </div>
              </div>
            </div>

            <Input
              label="Full Name *"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email *"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="WhatsApp / Phone *"
              placeholder="+1 234 567 8900"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Button
              className="w-full"
              onClick={handleSubmit}
              isLoading={isSubmitting}
              disabled={!selectedDate || !selectedTime}
            >
              Confirm Booking
            </Button>

            <p className="text-xs text-center text-[var(--text-muted)]">
              30-minute video call • Google Meet / Zoom
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
