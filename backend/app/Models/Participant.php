<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Participant extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'email',
        'institution',
        'ticket_id',
        'is_attended',
        'attended_at',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'is_attended' => 'boolean',
        'attended_at' => 'datetime',
    ];

    /**
     * Boot method — auto-generate UUID saat create.
     */
    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Participant $participant) {
            if (empty($participant->ticket_id)) {
                $participant->ticket_id = (string) Str::uuid();
            }
        });
    }

    /**
     * Tandai peserta sebagai hadir (check-in via scan QR).
     */
    public function markAsAttended(): self
    {
        $this->is_attended = true;
        $this->attended_at = now();
        $this->save();

        return $this;
    }

    /**
     * Scope: hanya peserta yang sudah hadir.
     */
    public function scopeAttended($query)
    {
        return $query->where('is_attended', true);
    }

    /**
     * Scope: hanya peserta yang belum hadir.
     */
    public function scopeNotAttended($query)
    {
        return $query->where('is_attended', false);
    }
}
